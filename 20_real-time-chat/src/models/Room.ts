import { model, models, Schema } from "mongoose";

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // members: {
    //   type: [],
    // },
  },
  { timestamps: true },
);

const Room = models.Room || model("Room", roomSchema);

export default Room;
