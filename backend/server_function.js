import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import mongoose from "mongoose";

// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB ✅");
  })
  .catch((err) => {
    console.log(err);
  });

// HELPER FUNCTIONS
async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

// ROUTE FUNCTIONS
export async function login(req, res) {
  const { uid, pw } = req.body;
  const user = await User.findOne({ uid });
  if (user == null) {
    return res.status(400).json({ message: "User doesn't exists" });
  }
  if (!bcrypt.compare(pw, user.pw)) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  res.cookie("social-media-app-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return res.status(200).json({ message: "Logged In successfully" });
}

export async function signup(req, res) {
  const { name, email, uid, pw } = req.body;
  const user = await User.findOne({ uid });
  if (user == null) {
    const newUser = new User({
      email: email,
      name: name,
      uid: uid,
      pw: await hashPassword(pw),
    });
    await newUser.save();

    // jwt.sign(payload, secretKey, expiry)
    const token = jwt.sign({ _id: _id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("social-media-app-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res.status(200).json({ message: "Account created successfully" });
  } else {
    return res.status(400).json({ message: "User already exists" });
  }
}
