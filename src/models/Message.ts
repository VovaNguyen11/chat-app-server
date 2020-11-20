import mongoose, { Schema, Document } from "mongoose";

import { IDialog } from "./Dialog";

export interface IMessage extends Document {
  text: string;
  checked: boolean;
  dialog: string | IDialog;
}

const MessageSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    checked: { type: Boolean, default: false },
    dialog: { type: Schema.Types.ObjectId, ref: "Dialog", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
