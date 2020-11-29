import { Server } from "socket.io";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { UserModel } from "../models";
import { IUser } from "./../models/User";

import { createJWT } from "../utils";

class UserController {
  io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  signin(req: Request, res: Response) {
    const { email, password } = req.body;

    UserModel.findOne({ email: email }, (err, user: IUser) => {
      if (err || !user) {
        return res.status(404).json({
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

  show(req: Request, res: Response) {
    const id = req.user?._id;

    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      res.json(user);
    });
  }

  getMe = (req: Request, res: Response) => {
    const id: string = req.user?._id;

    UserModel.findById(id, (err, user: IUser) => {
      if (err || !user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      res.json(user);
    });
  };

  signup(req: Request, res: Response) {
    const { email, fullName, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.mapped() });
    } else {
      const user = new UserModel({ email, fullName, password });
      user
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
    }
  }

  verify(req: Request, res: Response) {
    const hash = req.query.hash as string;

    if (!hash) {
      res.status(400).json({ errors: "Invalid hash" });
    } else {
      UserModel.findOne({ confirmHash: hash }, (err, user: IUser) => {
        if (err || !user) {
          return res.status(404).json({
            message: "Hash not found",
          });
        } else {
          user.confirmed = true;
          user.save((err) => {
            if (err) {
              return res.status(404).json(err);
            }

            res.json({ message: "Account confirmed successfully!" });
          });
        }
      });
    }
  }

  findUsers(req: Request, res: Response) {
    const query = req.query.query as string;

    UserModel.find(
      {
        $or: [
          { fullName: new RegExp(query.trim(), "i") },
          { email: new RegExp(query.trim(), "i") },
        ],
      },
      (err, users) => {
        if (err) {
          res.status(403).json(err);
        }
        res.json(users);
      }
    );
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
