import { MongoClient, Db } from 'mongodb';

const url = 'mongodb+srv://ahmadabdulrahman6:JgBLeDYQo2AYAgtg@expense.snmjfj1.mongodb.net/?retryWrites=true&w=majority&appName=expense';

let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<Db> {
    if (!client) {
        console.log('here in db');

        client = new MongoClient(url);
        await client.connect();
        db = client.db('records');
        console.log('MongoDB connection established successfully');
    }
    return db;
}