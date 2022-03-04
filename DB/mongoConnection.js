import mongoose from "mongoose";
import config from "../config.js";

async function connectDB() {
   mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.once("open", () => {
    console.log("Database Connected");
  });

  db.on("error", (err) => {
    console.error(`connection error-> ${error}`);
  });
}

export default connectDB;
