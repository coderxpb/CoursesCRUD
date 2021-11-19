import express from "express";
import {v4 as uuid} from "uuid";
import {coursesData} from "../data/coursesData";

const router = express.Router();

//create a temporary instance of coursesData in order
let coursesDataInstance = coursesData;

//return json of all the courses
router.get("/", (req, res)=>{
    res.json(coursesDataInstance);
})

//add a new course
router.post("/", (req, res)=>{
    const id = uuid();
    coursesDataInstance[id]={
        id,
        name: req.body.name
    };
})

//delete course
router.delete("/", (req, res)=>{
    const {[req.body.id]: data, ...otherCourses} = coursesDataInstance;
    coursesDataInstance = otherCourses;
})

export {router as coursesRouter}