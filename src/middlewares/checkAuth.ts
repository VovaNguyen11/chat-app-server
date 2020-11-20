import { IUser } from "./../models/User";
import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils";

export default (req: Request, res: Response, next: NextFunction) => {
  if (
    req.path === "/user/signin" ||
    req.path === "/user/signup" ||
    req.path === "/user/verify"
  ) {
    return next();
  }

  const token = req.headers.token as string;

  if (token) {
    verifyJWT(token)
      .then((user: IUser) => {
        req.user = user;
        next();
      })
      .catch(() =>
        res.json({
          message: "Invalid auth token provided.",
        })
      );
  } else {
    res.json({
      message: "No token provided.",
    });
  }
};
