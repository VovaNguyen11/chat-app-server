import express from "express";

import bodyParser from "body-parser";
import dotenv from "dotenv";

import {
  UserController,
  DialogController,
  MessageController,
} from "./controllers";

import { updateLastSeen, checkAuth } from "./middlewares";
import { signinValidation, signupValidation } from "./utils";

import "./core/db";

dotenv.config();

const app = express();
const port: number = Number(process.env.PORT) || 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(updateLastSeen);
app.use(checkAuth);

const User = new UserController();
const Dialog = new DialogController();
const Message = new MessageController();

app.get("/user/signin", signinValidation, User.login);
app.post("/user/signup", signupValidation, User.create);
app.get("/user/:id", User.index);
app.delete("/user/:id", User.delete);

app.get("/dialogs", Dialog.index);
app.post("/dialogs/create", Dialog.create);
// app.delete("/dialogs/:id", Dialog.delete);

app.get("/messages", Message.index);
app.post("/messages", Message.create);
app.delete("/messages/:id", Message.delete);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
