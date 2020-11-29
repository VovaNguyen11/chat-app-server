import { check } from "express-validator";

import { UserModel } from "../models";

export default [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .custom((_, { req }) => {
      return new Promise((resolve, reject) => {
        UserModel.findOne({ email: req.body.email }, function (err, user) {
          if (err) {
            reject(new Error("Server Error"));
          }
          if (Boolean(user)) {
            reject(new Error("E-mail already in use"));
          }
          resolve(true);
        });
      });
    }),
  check("fullName").isLength({ min: 3 }),
  check("password").isLength({ min: 3 }),
];
