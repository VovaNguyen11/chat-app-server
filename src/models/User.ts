import mongoose, { Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";

export interface IUser extends Document {
  email: string;
  fullName: string;
  password: string;
  confirmed: boolean;
  avatar: string;
  confirmHash: string;
  lastSeen: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      require: "Email address is required",
      validate: [isEmail, "Invalid email"],
      unique: true,
    },
    fullName: {
      type: String,
      required: "Full name is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    confirmHash: String,
    lastSeen: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
