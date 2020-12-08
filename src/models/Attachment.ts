import mongoose, { Schema, Document } from "mongoose";

import { IMessage } from "./Message";

export interface IAttachment extends Document {
  fileName: string;
  size: number;
  ext: string;
  url: string;
  message: IMessage | string;
}

const AttachmentSchema: Schema = new Schema(
  {
    fileName: { type: String },
    size: Number,
    ext: String,
    url: String,
    message: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

const Attachment = mongoose.model<IAttachment>("Attachment", AttachmentSchema);

export default Attachment;
