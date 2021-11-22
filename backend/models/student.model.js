import mongoose from "mongoose";
const {Schema} = mongoose

const StudentSchema = new Schema({
  name: { type: String, required: true, maxLength: 60 },
  coursesTaken: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

export const Student = mongoose.model("Student", StudentSchema);
