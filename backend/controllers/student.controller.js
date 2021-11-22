import { Student } from "../models/student.model.js";
import jwt from "jsonwebtoken";

export const getAllStudents = async (req, res) => {
  const students = await Student.find();
  if(!students) return res.status(204).json({'message': 'No students found'});
  res.json(students)
  console.log(students)
}

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

