import express from "express";
import { verifyToken } from "./auth.route.js";
import {
  createNewCourse,
  deleteCourse,
  getAllCourses,
} from "../controllers/course.controller.js";

const router = express.Router();

//return json containing all the courses
router.get("/", getAllCourses);

//create a new course
router.post("/", verifyToken, createNewCourse);

//delete course
router.delete("/", verifyToken, deleteCourse);

export { router as coursesRouter };
