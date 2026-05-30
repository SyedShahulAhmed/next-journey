import { model, models, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
    },
    // type: {
    //   type: [],
    // },
  },
  { timestamps: true },
);

const Message = models.Message || model("Message", messageSchema);

export default Message;
