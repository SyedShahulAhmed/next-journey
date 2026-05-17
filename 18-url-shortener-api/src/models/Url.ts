import { model, models, Schema } from "mongoose";

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
      unique: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    lastVisited: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Url = models.Url || model("Url", urlSchema);

export default Url;
