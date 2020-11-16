import { Request, Response } from "express";

import { UserModel } from "../models";
import { IUser } from "./../models/User";

class UserController {
  index(req: Request, res: Response) {
    const id: string = req.params.id;

    UserModel.findById(id, (err, user: IUser) => {
      if (user) {
        res.json(user);
      } else {
        return res.status(404).json({
          message: "User not found",
        });
      }
    });
  }

  create(req: Request, res: Response) {
    const postData = {
      email: req.body.email,
      fullName: req.body.fullName,
      password: req.body.password,
    };

    const user = new UserModel(postData);
    user
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.json(err.message));
  }
  delete(req: Request, res: Response) {
    const id: string = req.params.id;

    UserModel.findOneAndDelete({ _id: id })
      .then((user: IUser | null) => {
        if (user) {
          res.json({
            message: `User ${user.fullName} removed successfully`,
          });
        }
      })
      .catch((err) => {
        res.json({
          message: err,
        });
      });
  }
}
export default UserController;
