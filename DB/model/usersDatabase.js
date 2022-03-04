import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    collection: "usersDatabase",
    versionKey: false,
  }
);

export default mongoose.model("usersDatabase", userSchema);
