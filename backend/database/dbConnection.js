import mongoose from 'mongoose';

export const dbConnection = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connection established successfully !!");
    })
    .catch((error) => {
        console.log(`Error connecting to database: ${error.message}`);
    })
}