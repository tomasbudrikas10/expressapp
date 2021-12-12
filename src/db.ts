import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
dotenv.config({path: ".env"})

class Database {
    public static uri = process.env.DB_KEY
    public static client = new MongoClient(Database.uri);
    public static db = Database.client.db("expressapp")
}

export default Database;