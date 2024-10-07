import { Pinecone } from '@pinecone-database/pinecone';
import {getEmbedding} from './createVectorDB.mjs';
import OpenAI from 'openai';
import readline from 'readline';
import { error } from 'console';
import fetch from 'node-fetch';


const LLMerror = "Error getting response from LLM"

const openai = new OpenAI(
    // apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
   );

export async function queryVectorDB(question) {
  console.log("inside quert vector db function")
  
  const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY ,
      fetchApi: fetch
    });

    if (pc)
    {console.log(" successfully got the pc pinecone variable")}
  
    const indexName = 'text-embeddings';
    const index =  pc.index(indexName);

    // Generate embedding for the question
    const questionEmbedding = await getEmbedding(question);

    console.log(questionEmbedding, "got te embeddings")
  
    // Query the index
    const queryResponse = await index.query({
      vector: questionEmbedding,
      topK: 5,
      includeMetadata: true
    });
    
    console.log("queryResponse",queryResponse)

    if (queryResponse)
    {
      return queryResponse.matches.map(match => match.metadata.text);
    }
    else 
    {
        return error
    }
  }

  export async function generateAnswer(question, relevantTexts) {
    const prompt = `
  Context information is below.
  ---------------------
  ${relevantTexts.join('\n\n')}
  ---------------------
  Given the context information and not prior knowledge, answer the question: ${question}
  `;
  
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150
    });

    if (completion)
    {
      console.log(completion.choices[0].message)
      return completion.choices[0].message.content;
    }
    else 
    {
      return error
    }
  }
  
 export async function askAndAnswer(question) {
    console.log(`Question: ${question}`);
    const relevantTexts = await queryVectorDB(question);
    console.log('Relevant texts:');
    relevantTexts.forEach((text, index) => {
      console.log(`${index + 1}. ${text}`);
    });
    
    const answer = await generateAnswer(question, relevantTexts);
    console.log('\nGenerated Answer:');
    console.log(answer);
    
    if (typeof answer === 'string') {
      return answer;
    } else {
      return LLMerror;
    }
    
  }

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  // Function to prompt for a question
  function askQuestion() {
    rl.question('Enter your question (or type "exit" to quit): ', async (question) => {
      if (question.toLowerCase() === 'exit') {
        rl.close();
        return;
      }
  
      try {
        await askAndAnswer(question);
      } catch (error) {
        console.error('An error occurred:', error);
      }
  
      // Ask for the next question
      askQuestion();
    });
  }
  
  // Start the question loop
  //console.log('Welcome to the Q&A system. You can ask as many questions as you like.');
  //askQuestion();    

