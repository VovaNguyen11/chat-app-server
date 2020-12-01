require("dotenv").config();
import jwt from "jsonwebtoken";
import _reduce from "lodash/reduce";

interface ILoginData {
  email: string;
  password: string;
}

export default (details: ILoginData) => {
  const token = jwt.sign(
    {
      data: _reduce(
        details,
        (result: any, value: string, key: string) => {
          if (key !== "password") {
            result[key] = value;
          }
          return result;
        },
        {}
      ),
    },
    process.env.JWT_SECRET || "",
    {
      expiresIn: process.env.JWT_MAX_AGE,
      algorithm: "HS256",
    }
  );

  return token;
};
