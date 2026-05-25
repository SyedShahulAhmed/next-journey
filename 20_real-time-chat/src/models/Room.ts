import { model, models, Schema } from "mongoose";

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: {
      type: [],
    },
  },
  { timestamps: true },
);

const Room = models.Room || model("Room", roomSchema);

export default Room;
