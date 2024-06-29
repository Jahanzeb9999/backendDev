import dotenv from 'dotenv';
import connectDb from "./db/index.js";
import express from "express";


dotenv.config({ path: './.env' });
const app = express();

connectDb()
.then(() => {
    app.on("error", () => {
        console.log("Error", error)
        throw error;

    });

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("Mongo db connection failed !!", err);
})




// (async () => {
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("errror", () => {
//         console.log("Errr", error);
//         throw error;
//        });

//        app.listen(process.env.PORT, () => {
//         console.log(`App is listening to the PORT ${process.env.PORT}`);
//        })

//     }
//     catch(error) {

//     }

// })()