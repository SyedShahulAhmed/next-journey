import { model, models, Schema } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: "",
    },
    salary: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected", "Ghosted", "Saved"],
      default: "Applied",
    },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
      default: "Full-time",
    },
    jobLink: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    interviewDate: {
      type: Date,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Job = models.Job || model("Job", jobSchema);

export default Job;
