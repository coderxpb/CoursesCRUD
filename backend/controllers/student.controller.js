import { Student } from "../models/student.model.js";
import { Course } from "../models/course.model.js";

import jwt from "jsonwebtoken";

export const getAllStudents = async (req, res) => {
  const students = await Student.find();
  if (!students) return res.status(204).json({ message: "No students found" });
  res.json(students);
};

export const getPaginatedStudents = async (req, res) => {
  let { page, size, search } = req.query;

  page = page || 1;
  size = size || 10;

  const limit = parseInt(size);
  const skip = (parseInt(page) - 1) * limit;

  const studentsList = await Student.find(
    { name: new RegExp(search) },
    {},
    { limit, skip }
  );
  const studentsCount = await Student.find({
    name: new RegExp(search),
  }).count();
  const pageCount = Math.ceil(studentsCount / limit);

  res.json({ studentsList, pageCount });
};

export const getCoursesOfStudent = async (req, res) => {
  const student = await Student.findById(req.query._id);
  const courses = await Course.find({ _id: { $in: student.coursesTaken } });
  res.json(courses);
};

export const createNewStudent = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error) => {
    if (error) res.sendStatus(403);
    else {
      await Student.create({
        name: req.body.name,
        coursesTaken: req.body.coursesTaken,
      });
      res.json(`Added new student ${req.body.name}`);
    }
  });
};

export const deleteStudent = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error) => {
    if (error) res.sendStatus(403);
    else {
      await Student.findByIdAndDelete(req.body._id);

      res.json("Deleted student");
    }
  });
};

export const modifyCoursesTaken = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error) => {
    if (error) res.sendStatus(403);
    else {
      await Student.findByIdAndUpdate(req.body._id, {
        coursesTaken: req.body.coursesTaken,
      });
      res.json("modified");
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
      res.json("added");
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
      res.json("removed");
    }
  });
};
