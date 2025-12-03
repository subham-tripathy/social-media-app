import express from "express";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
const app = express();
import { login, signup } from "./server_function.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

app.use(express.json());
app.use(cookieParser());

const b2 = new S3Client({
  region: process.env.B2_REGION,
  endpoint: process.env.B2_END_POINT,
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_APP_KEY,
  },
});

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

// MEDIA UPLOAD ROUTE
const upload = multer({ storage: multer.memoryStorage() });
app.post("/api/upload", upload.single("media"), async (req, res) => {
  const file = req.file;
  if (!file) res.status(400).json({ message: "No file uploaded" });

  const token = req.cookies["social-media-app-token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findById(
    jwt.verify(token, process.env.SECRET_KEY)._id
  );

  const uniqueFileName = `${Date.now()}+${file.originalname}`.replace(
    / /g,
    "_"
  );

  try {
    const uploadRes = await b2.send(
      new PutObjectCommand({
        Bucket: process.env.B2_BUCKET_NAME,
        Key: uniqueFileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    user.posts.push({
      fileName: uniqueFileName,
      caption: req.body.caption,
    });
    await user.save();

    res.status(200).json({
      message: "File uploaded successfully",
      fileName: uniqueFileName,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/api/media/:fileName", async (req, res) => {
  const fileName = req.params.fileName;

  if (!fileName) {
    return res.status(400).json({ message: "File name is required" });
  }

  res.status(500).json({ error: "Failed to generate signed URL" });
});

app.get("/api/allposts", (req, res) => {
  const allPosts = [];
  User.find().then(async (users) => {
    for (const user of users) {
      const userPosts = await Promise.all(
        user.posts.map(async (post) => ({
          fileUrl: await getSignedUrlFunction(post.fileName),
          caption: post.caption,
          createdAt: post.createdAt,
        }))
      );
      allPosts.push(...userPosts);
    }
    allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json({ posts: allPosts });
  });
});

app.get("/api/myposts", async (req, res) => {
  const token = req.cookies["social-media-app-token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await User.findById(
    jwt.verify(token, process.env.SECRET_KEY)._id
  );
  res.status(200).json({ posts: user.posts });
});

app.get("/api/logout", async (req, res) => {
  res.clearCookie("social-media-app-token");
  return res.status(200).json({ message: "Logged Out successfully" });
});

async function getSignedUrlFunction(fileName) {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME,
      Key: fileName,
    });

    const getSignedUrlRes = await getSignedUrl(b2, command, {
      expiresIn: 3600,
    });
    return getSignedUrlRes;
  } catch (err) {
    console.error(err);
    return "";
  }
}

app.listen(6969, () => {
  console.log("server has started successfully ✅");
});
