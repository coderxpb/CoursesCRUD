import express from "express";
import { v4 as uuid } from "uuid";
import { studentsData } from "../data/studentsData.js";
import jwt from "jsonwebtoken";
import {verifyToken} from "./auth.js";
import _ from 'lodash';

const router = express.Router();

//create a temporary instance of studentsData
let dataInstance = studentsData;

//return json containing all the students
router.get("/", (req, res) => {
  res.json(dataInstance);
});

//return paginated student list
router.get("/list", (req, res)=>{
  let {page, size} = req.query
  page = page || 1
  size = size || 10

  const limit = parseInt(size);
  const skip = (parseInt(page) - 1) * limit;
  const studentIndices = Object.getOwnPropertyNames(dataInstance).slice(skip, skip+limit);
  const studentList = _.pick(dataInstance, studentIndices)
  const pageCount = Math.ceil(_.size(dataInstance)/limit)
  console.log(pageCount)
  res.json(studentList)
})

//add a new student
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

//modify coursesTaken by a specific student
router.put("/:id/courses", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (error) => {
    if (error) res.sendStatus(403);
    else {
      const id = req.body.id;
      dataInstance[id].coursesTaken = req.body.coursesTaken;
      res.end(`Changed courses of ${dataInstance[id].name}`);
    }
  });
});

//delete student
router.delete("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (error) => {
    if (error) res.sendStatus(403);
    else {
      const { [req.body.id]: data, ...otherStudents } = dataInstance;
      dataInstance = otherStudents;
      res.end(`Deleted student ${data.name}`);
    }
  });
});

export { router as studentsRouter };
