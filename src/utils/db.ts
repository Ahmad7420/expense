import { MongoClient, Db } from 'mongodb';

const url = 'mongodb+srv://ahmadabdulrahman6:JgBLeDYQo2AYAgtg@expense.snmjfj1.mongodb.net/?retryWrites=true&w=majority&appName=expense';

let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<Db> {
    if (!client) {

        client = new MongoClient(url);
        await client.connect();
        db = client.db('records');
        console.log('MongoDB connection established successfully');
    }
    return db;
}



// import { MongoClient, Db } from 'mongodb';

// const uri = 'mongodb+srv://ahmadabdulrahman6:JgBLeDYQo2AYAgtg@expense.snmjfj1.mongodb.net/records?retryWrites=true&w=majority&tls=true&appName=expense';
// const dbName = 'records';

// if (!uri) {
//     throw new Error('Please define the MONGODB_URI environment variable');
// }

// // Create a global variable to cache the client and db in Vercel's serverless environment
// declare global {
//     // eslint-disable-next-line no-var
//     var _mongoClientPromise: Promise<MongoClient>;
//     // eslint-disable-next-line no-var
//     var _mongoClient: MongoClient;
// }

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (!global._mongoClientPromise) {
//     client = new MongoClient(uri);
//     global._mongoClientPromise = client.connect();
// }
// clientPromise = global._mongoClientPromise;

// export async function connectToDatabase(): Promise<Db> {
//     const client = await clientPromise;
//     return client.db(dbName);
// }


