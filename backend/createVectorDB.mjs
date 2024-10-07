import fs from 'fs';
import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';


// Initialize OpenAI (for generating embeddings)
const openai = new OpenAI(
   // apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  );

export async function getEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  console.log(response)
  return response.data[0].embedding;
}

async function processTextFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').filter(line => line.trim() !== '');
  
  const records = [];
  for (let i = 0; i < lines.length; i++) {
    const embedding = await getEmbedding(lines[i]);
    records.push({
      id: `line_${i + 1}`,
      values: embedding,
      metadata: { text: lines[i] }
    });
  }
  
  return records;
}

async function createVectorDB(filePath) {
  // Initialize Pinecone
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY 
  });

  // Create a serverless index (if it doesn't exist)
  const indexName = 'text-embeddings';
  const indexList = await pc.listIndexes();

  // Check if the index exists
  const indexExists = indexList.indexes.some(index => index.name === indexName);
  
  if (!indexExists) {
    await pc.createIndex({ 
      name: indexName, 
      dimension: 1536,  // Dimension for text-embedding-ada-002
      spec: { serverless: { cloud: 'aws', region: 'us-east-1' } } 
    });
    console.log(`Created new index: ${indexName}`);
  }

  // Target the index
  const index = pc.index(indexName);

  // Process the text file and get records
  const records = await processTextFile(filePath);

  // Upsert the records in batches
  const batchSize = 100;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await index.upsert(batch);
    console.log(`Upserted batch ${i/batchSize + 1}`);
  }

  console.log('Finished creating vector database from text file');
}

// Usage
//createVectorDB('/Users/omkarpatil/Note_Taking_App/note_app/trasncript.txt')
//  .catch(console.error);