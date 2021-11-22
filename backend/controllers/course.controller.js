import { Course } from "../models/course.model.js";
import jwt from "jsonwebtoken";

export const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  if(!courses) return res.status(204).json({'message': 'No courses found'});
  res.json(courses)
}

export const create = async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (error) => {
    if (error) res.sendStatus(403);
    else {
      const result = await Course.create({
        name: req.body.name,
      });
      res.end(`Added new course ${req.body.name}`);
    }
  });
};


