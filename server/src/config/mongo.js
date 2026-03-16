import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

let db;

export async function connectDB(){

    await client.connect();

    db = client.db(process.env.DB_NAME);

    console.log("MongoDB connected");

}

export function getDB(){
    return db;
}