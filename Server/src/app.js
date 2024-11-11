import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    // origin: "http://localhost:5173", // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Import all User Routes
import userLoginRouter from "./routes/user.Routes.js";
import knowledgeRouter from "./routes/Knowledge.Routes.js";
//Routes defined
app.use("/api/v1/user", userLoginRouter);
app.use("/api/v1/knowledge", knowledgeRouter);

export default app;
