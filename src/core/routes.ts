import bodyParser from "body-parser";
import { Express } from "express";
import { Server } from "socket.io";
import uploader from "./multer";

import { updateLastSeen, checkAuth } from "../middlewares";
import { signinValidation, signupValidation } from "../utils";

import {
  UserController,
  DialogController,
  MessageController,
  AttachmentController,
} from "../controllers";

export default (app: Express, io: Server) => {
  const User = new UserController(io);
  const Dialog = new DialogController(io);
  const Message = new MessageController(io);
  const Attachment = new AttachmentController();

  app.use(bodyParser.json());
  app.use(checkAuth);
  app.use(updateLastSeen);

  app.post("/user/signin", signinValidation, User.signin);
  app.post("/user/signup", signupValidation, User.signup);
  app.get("/user/verify", User.verify);
  app.get("/user/me", User.getMe);
  app.get("/user/find", User.findUsers);
  app.get("/user/:id", User.show);
  app.delete("/user/:id", User.delete);

  app.get("/dialogs", Dialog.index);
  app.post("/dialogs/create", Dialog.create);

  app.get("/messages", Message.index.bind(Message));
  app.post("/messages", Message.create.bind(Message));
  app.delete("/messages/:id", Message.delete.bind(Message));

  app.post("/files", uploader.single("file"), Attachment.create);
  // app.delete("/files", UploadFileController.delete);
};
