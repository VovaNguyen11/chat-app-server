import { IMessage } from "./Message";
import { IUser } from "./User";
import mongoose, { Schema, Document } from "mongoose";

export interface IAttachment extends Document {
  fileName: string;
  size: number;
  ext: string;
  url: string;
  message: IMessage | string;
  user: IUser | string;
}

const AttachmentSchema: Schema = new Schema(
  {
    fileName: { type: String },
    size: Number,
    ext: String,
    url: String,
    message: { type: Schema.Types.ObjectId, ref: "Message", require: true },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
  },
  {
    timestamps: true,
  }
);

const Attachment = mongoose.model<IAttachment>("Attachment", AttachmentSchema);

export default Attachment;
