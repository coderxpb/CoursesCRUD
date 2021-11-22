import express from "express";
import { v4 as uuid } from "uuid";
import { coursesData } from "../data/courses.data.js";
import { verifyToken } from "./auth.route.js";
import jwt from "jsonwebtoken";
import { getAllCourses } from "../controllers/course.controller.js";

const router = express.Router();

//create a temporary instance of coursesData in order
let dataInstance = coursesData;

//return json containing all the courses
router.get("/", getAllCourses);

//add a new course
router.post("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (error) => {
    if (error) res.sendStatus(403);
    else {
      const id = uuid();
      dataInstance[id] = {
        id,
        name: req.body.name,
      };
      res.end(`Added new course ${req.body.name}`);
    }
  });
});

//delete course
router.delete("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (error) => {
    if (error) res.sendStatus(403);
    else {
      const { [req.body.id]: data, ...otherCourses } = dataInstance;
      dataInstance = otherCourses;
      res.end(`Deleted course ${data.name}`);
    }
  });
});

export { router as coursesRouter };
