import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validationResult, Result, ValidationError } from "express-validator";

import { UserModel } from "../models";
import { IUser } from "./../models/User";

import { createJWT } from "../utils";

class UserController {
  login(req: Request, res: Response) {
    const { email, password } = req.body;

    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      UserModel.findOne({ email: email }, (err, user: IUser) => {
        if (err || !user) {
          res.status(404).json({
            message: "User not found",
          });
        }

        if (bcrypt.compareSync(password, user.password)) {
          const token = createJWT(user);
          res.json({ token });
        } else {
          res.status(403).json({
            message: "Incorrect password or email",
          });
        }
      });
    }
  }

  index(req: Request, res: Response) {
    const id = req.params.id;

    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      res.json(user);
    });
  }

  create(req: Request, res: Response) {
    const { email, fullName, password } = req.body;

    const user = new UserModel({ email, fullName, password });
    user
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  }

  delete(req: Request, res: Response) {
    const id = req.params.id;

    UserModel.findOneAndDelete({ _id: id })
      .then((user: IUser | null) => {
        if (user) {
          res.json({
            message: `User ${user.fullName} removed successfully`,
          });
        }
      })
      .catch((err) => res.json(err));
  }
}
export default UserController;
