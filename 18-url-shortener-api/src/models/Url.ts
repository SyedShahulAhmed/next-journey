import mongoose, { model, models, Schema } from "mongoose";

const urlSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortCode: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
    },
    lastVisited: {
      type: String,
    },
  },
  { timestamps: true },
);

const Url = models.Url || model("Url",urlSchema)

export default Url
