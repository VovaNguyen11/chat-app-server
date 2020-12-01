import mongoose, { Schema, Document } from "mongoose";

import { IUser } from "./User";
import { IDialog } from "./Dialog";

export interface IMessage extends Document {
  text: string;
  isChecked: boolean;
  dialog: IDialog | string;
  user: IUser | string;
}

const MessageSchema: Schema = new Schema(
  {
    text: { type: String },
    isChecked: { type: Boolean, default: false },
    dialog: { type: Schema.Types.ObjectId, ref: "Dialog", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    attachments: [{ type: Schema.Types.ObjectId, ref: "Attachment" }],
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
