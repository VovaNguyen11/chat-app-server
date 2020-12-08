import mongoose, { Schema, Document } from "mongoose";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { generatePasswordHash } from "../utils";

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
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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

UserSchema.pre<IUser>("save", async function (next) {
  const user = this;

  // if (!user.isModified("password")) {
  //   return next();
  // }
  try {
    user.password = await generatePasswordHash(user.password);
    user.confirmHash = await generatePasswordHash(new Date().toString());
  } catch (err) {
    next(err);
  }
});

UserSchema.virtual("isOnline").get(function (this: IUser) {
  return differenceInMinutes(new Date(), this.lastSeen) < 2;
});

UserSchema.set("toJSON", {
  virtuals: true,
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
