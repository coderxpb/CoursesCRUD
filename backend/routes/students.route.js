import express from "express";
import { v4 as uuid } from "uuid";
import { studentsData } from "../data/students.data.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "./auth.route.js";
import _ from "lodash";
import {
  addCourseToStudent,
  createNewStudent,
  deleteStudent,
  getAllStudents, getCoursesOfStudent, getPaginatedStudents, modifyCoursesTaken, removeCourseFromStudent,
} from '../controllers/student.controller.js'
const router = express.Router();

//create a temporary instance of studentsData
let dataInstance = studentsData;

//return json containing all the students
router.get("/", getAllStudents);

//return paginated student list
router.get("/list", getPaginatedStudents);

//add a new student
router.post("/", verifyToken, createNewStudent);

//delete student
router.delete("/", verifyToken, deleteStudent);

//modify coursesTaken by a student
router.put("/courses", verifyToken, modifyCoursesTaken);

//remove a specific course taken by a student
router.delete("/courses", verifyToken, removeCourseFromStudent);

//add a specific course to a student
router.post("/courses", verifyToken, addCourseToStudent);

//get courses of a specific student
router.get("/courses", getCoursesOfStudent);

export { router as studentsRouter };
