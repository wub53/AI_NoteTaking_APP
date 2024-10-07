from pymongo import MongoClient
import os

# MongoDB connection details
MONGO_URI = "mongodb+srv://admin_123:admin_123@cluster0.7pg6ken.mongodb.net/"  # Replace with your MongoDB URI
DB_NAME = "Transcripts"
COLLECTION_NAME = "history_transcripts"

# Path to your text file
FILE_PATH = "/Users/omkarpatil/Note_Taking_App/note_app/trasncript.txt"

def read_text_file(file_path):
    """Read the contents of a text file."""
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def insert_to_mongodb(text_content, file_name):
    """Insert the text content into MongoDB."""
    try:
        # Connect to MongoDB
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]

        # Create a document
        document = {
            "file_name": file_name,
            "content": text_content
        }

        # Insert the document
        result = collection.insert_one(document)

        print(f"Document inserted with ID: {result.inserted_id}")

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        client.close()

def main():
    # Read the text file
    text_content = read_text_file(FILE_PATH)

    # Get the file name from the path
    file_name = os.path.basename(FILE_PATH)

    # Insert into MongoDB
    insert_to_mongodb(text_content, file_name)

if __name__ == "__main__":
    main()