import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import { coursesRouter } from "./routes/courses.js";
import { studentsRouter } from "./routes/students.js";
import { authRouter } from "./routes/auth.js";
import nocache from 'nocache';

const app = express();
app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/courses", coursesRouter);
app.use("/api/students", studentsRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
