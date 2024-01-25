import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || '';
const MONGO_DB = process.env.MONGO_DB || '';

// MongoDB client
const client = new MongoClient(MONGO_URI);

// MongoDB connection
let conn;

try {
  conn = client.connect();
  console.log('Connected to MongoDB');
} catch (error) {
  console.log(error);
}

// Set Database
const db = client.db(MONGO_DB);

// Export db
export default db;