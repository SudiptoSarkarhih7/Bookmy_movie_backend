import mongoose from "mongoose";

const dbCon = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to database`.green.bold);  
    } catch (error) {
        console.log(`Failed to connect to database: ${error.message}`.red.bold);
    }
}

export default dbCon