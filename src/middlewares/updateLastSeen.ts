import { Request, Response, NextFunction } from "express";

import { UserModel } from "../models";

export default async (req: Request, _: Response, next: NextFunction) => {
  await UserModel.findOneAndUpdate(
    { _id: req.user?._id },
    { lastSeen: new Date() },
    { new: true }
  );
  next();
};
