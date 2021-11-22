import mongoose from "mongoose";
const {Schema} = mongoose

const CourseSchema = new Schema({
  name: { type: String, required: true, maxLength: 60 },
});

export const Course = mongoose.model("Course", CourseSchema);
