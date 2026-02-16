import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Successfully connected to database");
  } catch (error) {
    console.error("Couldn't connect to database");
    throw error;
  }
}

export default connectToDB;
