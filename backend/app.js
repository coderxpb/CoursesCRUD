import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { coursesRouter } from "./routes/courses.route.js";
import { studentsRouter } from "./routes/students.route.js";
import { authRouter } from "./routes/auth.route.js";

const source = process.env.ATLAS_CONNECTION;
const app = express();
app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/courses", coursesRouter);
app.use("/api/students", studentsRouter);
app.use("/api/auth", authRouter);

mongoose.connect(source, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB connected.");
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
});

connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
