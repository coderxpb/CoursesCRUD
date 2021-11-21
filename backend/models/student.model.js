import * as mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, maxLength: 60 },
  coursesTaken: { type: [String], required: true },
});

export const Student = mongoose.model('Student', StudentSchema);
