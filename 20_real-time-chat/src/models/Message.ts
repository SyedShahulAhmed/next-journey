import { model, models, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    type: {
      type: [],
    },
  },
  { timestamps: true },
);

const Message = models.Message || model("Message", messageSchema);

export default Message;
