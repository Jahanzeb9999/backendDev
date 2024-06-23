import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express"
const app = express()




const connectDb = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDb connected !! DB Host : ${connectionInstance.connection.host}`);


    }

    catch(error) {
        console.log("Mongodb connection erorr", error)
        process.exit(1)
    }
}


export default connectDb;