import { Request, Response, NextFunction } from "express";

import { UserModel } from "../models";

export default async (_: Request, __: Response, next: NextFunction) => {
  await UserModel.findOneAndUpdate(
    { _id: "5fb3a42fa2e18adee494a3aa" },
    { lastSeen: new Date() },
    { new: true }
  );
  next();
};
