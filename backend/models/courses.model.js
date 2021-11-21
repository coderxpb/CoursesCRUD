import * as mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, maxLength: 60 },
});

export const Course = mongoose.model('Course', CourseSchema);
