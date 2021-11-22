import { Student } from "../models/student.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const getAllStudents = async (req, res) => {
  const students = await Student.find();
  if (!students) return res.status(204).json({ message: "No students found" });
  res.json(students);
};

export const createNewStudent = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error) => {
    if (error) res.sendStatus(403);
    else {
      const result = await Student.create({
        name: req.body.name,
        coursesTaken: req.body.coursesTaken,
      });
      res.end(`Added new student ${req.body.name}`);
    }
  });
};

export const deleteStudent = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error) => {
    if (error) res.sendStatus(403);
    else {
      await Student.findByIdAndDelete(req.body.id);
      res.end("Deleted student");
    }
  });
};

export const modifyCoursesTaken = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error) => {
    if (error) res.sendStatus(403);
    else {
      console.log(req.body.id, req.body.coursesTaken)
      await Student.findByIdAndUpdate(req.body.id, {
         coursesTaken: req.body.coursesTaken ,
      });
      res.end('modified')
    }
  });
};

export const addCourseToStudent = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error) => {
    if (error) res.sendStatus(403);
    else {
      const studentID = req.body.studentID;
      const courseID = req.body.courseID;
      await Student.findByIdAndUpdate(studentID, {
        $addToSet: { coursesTaken: courseID },
      });
      res.end('added')
    }
  });
};

export const removeCourseFromStudent = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error) => {
    if (error) res.sendStatus(403);
    else {
      const studentID = req.body.studentID;
      const courseID = req.body.courseID;
      await Student.findByIdAndUpdate(studentID, {
        $pullAll: { coursesTaken: [courseID] },
      });
      res.end('removed')
    }
  });
};
