import { names } from "./names";
import { sample } from 'lodash/collection'
import { random } from 'lodash/number'
import { Student } from '../models/student.model'
import { range } from 'lodash/util'

const courseIDs = [
  "619b355d9c5254bbf16ceea0",
  "619b356e9c5254bbf16ceea1",
  "619b357a9c5254bbf16ceea2",
  "619b35879c5254bbf16ceea3",
  "619b35939c5254bbf16ceea4",
  "619b359f9c5254bbf16ceea5",
  "619b35a99c5254bbf16ceea6",
  "619b35b39c5254bbf16ceea7",
];

_.range(0,100).forEach(async (current, index) => {
  const name = sample(names)
  const noOfCourses = random(0,5)

  const result = await Student.create({
    name,
    coursesTaken: req.body.coursesTaken,
  });
})


