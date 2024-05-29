import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || '';
const MONGO_DB = process.env.MONGO_DB || '';

// MongoDB client
export const client = new MongoClient(MONGO_URI);

// MongoDB connection
client.connect().then(() => {
  console.log('Connected to MongoDB');
  // ensure index on the 'title' field
  // get index information for the 'books' collection
  client.db(MONGO_DB).collection('books').indexInformation().then((indexes) => {
    // check if the 'title' field has an index
    if (!Object.keys(indexes).includes('title_1')) {
      // create an index on the 'title' field
      client.db(MONGO_DB).collection('books').createIndex({ title: 1 }).then(() => {
        console.log('Index created on the "title" field');
      }).catch(err => console.log(err));
    }
  }).catch(err => console.log(err));

}).catch(err => console.log(err));

// Set Database
const db = client.db(MONGO_DB);

// Export db
export default db;