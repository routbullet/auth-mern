const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/";
const dbName = "myDatabase";
const connectDB = async () => {
  try {
    await mongoose.connect(connectionString + dbName);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("failed to connect with mongoDB, error: ", error);
  }
};

module.exports = connectDB;
