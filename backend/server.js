import express from "express";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
const app = express();
import { login, signup } from "./server_function.js";
import cookieParser from "cookie-parser";
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello JI");
});

app.post("/api/login", async (req, res) => {
  return await login(req, res);
});

app.post("/api/signup", async (req, res) => {
  return await signup(req, res);
});

app.get("/api/me", async (req, res) => {
  const token = req.cookies["social-media-app-token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await User.findById(
    jwt.verify(token, process.env.SECRET_KEY)._id
  );
  res.status(200).json({ name: user.name, email: user.email, uid: user.uid });
});

app.listen(6969, () => {
  console.log("server has started successfully ✅");
});
