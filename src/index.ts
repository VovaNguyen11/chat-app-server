import express from "express";

import bodyParser from "body-parser";
import dotenv from "dotenv";

import { UserModel } from "./models";
import { UserController } from "./controllers";

dotenv.config();
import "./core/db";

const app = express();
const port: number = Number(process.env.PORT) || 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const User = new UserController();

app.get("/user/:id", User.index);
app.post("/user/create", User.create);
app.delete("/user/:id", User.delete);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
 