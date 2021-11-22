import express from "express";
import { v4 as uuid } from "uuid";
import { studentsData } from "../data/students.data.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "./auth.route.js";
import _ from "lodash";
import { createNewStudent, getAllStudents } from '../controllers/student.controller.js'
const router = express.Router();

//create a temporary instance of studentsData
let dataInstance = studentsData;

//return json containing all the students
router.get("/", getAllStudents);

//return paginated student list
router.get("/list", (req, res) => {
  console.log('get paginated page')
  let { page, size } = req.query;

  page = page || 1;
  size = size || 10;

  const limit = parseInt(size);
  const skip = (parseInt(page) - 1) * limit;
  const studentIndices = Object.getOwnPropertyNames(dataInstance).slice(
    skip,
    skip + limit
  );
  const studentList = _.pick(dataInstance, studentIndices);
  const pageCount = Math.ceil(_.size(dataInstance) / limit);

  res.json({ studentList, pageCount });
});

//add a new student
router.post("/", verifyToken, createNewStudent);

router.post("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (error) => {
    if (error) res.sendStatus(403);
    else {
      const id = uuid();
      const student = {
        id,
        name: req.body.name,
        coursesTaken: req.body.coursesTaken,
      };
      dataInstance[id] = student;
      res.end(`Added new student ${student.name}`);
    }
  });
});

//delete student
router.delete("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (error) => {
    if (error) res.sendStatus(403);
    else {
      console.log(`deleting student ${dataInstance[req.body.id].name}`)
      const { [req.body.id]: data, ...otherStudents } = dataInstance;
      dataInstance = otherStudents;
      res.json(`Deleted student`);
    }
  });
});

//modify coursesTaken by a student
router.put("/courses", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (error) => {
    if (error) res.sendStatus(403);
    else {
      console.log(`modifying courses of ${dataInstance[req.body.id].name}`)
      const id = req.body.id;
      dataInstance[id].coursesTaken = req.body.coursesTaken;
      res.json(`Changed courses of ${dataInstance[id].name}`);
    }
  });
});

//remove a specific course taken by a student
router.delete("/courses", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (error) => {
    if (error) res.sendStatus(403);
    else {
      console.log(`deleting course of ${dataInstance[req.body.studentID].name}`)
      const studentID = req.body.studentID;
      const courseID = req.body.courseID;
      const updatedCourses = dataInstance[studentID].coursesTaken.filter(
        (n) => n !== courseID
      );
      dataInstance[studentID].coursesTaken = updatedCourses;

      res.json(`Changed courses of ${dataInstance[studentID].name}`);
    }
  });
});

//add a specific course to a student
router.post("/courses", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (error) => {
    if (error) res.sendStatus(403);
    else {
      const studentID = req.body.studentID;
      const courseID = req.body.courseID;
      if (!dataInstance[studentID].coursesTaken.includes(courseID))
        dataInstance[studentID].coursesTaken.push(courseID);
      res.json(`Changed courses of ${dataInstance[studentID].name}`);
    }
  });
});

//get courses of a specific student
router.get("/courses", (req, res) => {
  console.log(`fetching courses for ${dataInstance[req.query.id].name}`)
  const id = req.query.id;
  res.json(dataInstance[id].coursesTaken);
});

export { router as studentsRouter };
