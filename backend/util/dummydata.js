import { names } from "./names.js";
import { Student } from '../models/student.model.js'
import _ from 'lodash'


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

export const fillMockData = () => {
  _.range(0,300).forEach(async () => {
    const name = _.sample(names) + ' ' + _.sample(names)
    const noOfCourses = _.random(1,5)
    const coursesTaken = _.sampleSize(courseIDs, noOfCourses)

    const result = await Student.create({
      name,
      coursesTaken
    });
  })
}



