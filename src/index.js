import dotenv from 'dotenv';
import connectDb from "./db/index.js";


dotenv.config({ path: './.env' });


connectDb()




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