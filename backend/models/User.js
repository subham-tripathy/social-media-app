import mongoose from "mongoose";

const posts = new mongoose.Schema({
  fileName: { type: String, require: true },
  caption: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  uid: { type: String, require: true, unique: true },
  pw: { type: String, require: true },
  posts: [posts],
});

export default mongoose.model("User", userSchema);
