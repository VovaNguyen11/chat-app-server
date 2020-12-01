import { Request, Response } from "express";
import { Server } from "socket.io";
import { DialogModel, MessageModel } from "../models";

class MessageController {
  io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  index(req: Request, res: Response) {
    const dialogId = req.query.dialogId as string;
    const userId = req.user?._id as string;

    MessageModel.updateMany(
      { dialog: dialogId, user: { $ne: userId } },
      { isChecked: true },
      (err) => {
        if (err) {
          res.status(500).json(err);
        } else {
          this.io.emit("MESSAGES_CHECKED", userId, dialogId);
        }
      }
    );

    MessageModel.find({ dialog: dialogId })
      .populate(["user", "attachments"])
      .exec((err, messages) => {
        if (err) {
          return res.status(404).json({
            message: "Messages not found",
          });
        }
        return res.json(messages);
      });
  }

  create(req: Request, res: Response) {
    const userId = req.user?._id as string;
    const { text, dialogId, attachments } = req.body;

    const message = new MessageModel({
      text,
      attachments,
      dialog: dialogId,
      user: userId,
    });

    message
      .save()
      .then((obj) => {
        obj.populate("user attachments", (err, message) => {
          if (err) {
            return res.status(500).json({
              message: err,
            });
          }

          DialogModel.findOneAndUpdate(
            { _id: dialogId },
            { lastMessage: message._id },
            { upsert: true },
            (err) => {
              if (err) {
                return res.status(500).json({
                  message: err,
                });
              }
            }
          );
          res.json(message);
          this.io.emit("NEW_MESSAGE", message);
        });
      })
      .catch((err) => res.json(err));
  }

  delete(req: Request, res: Response) {
    const _id = req.params.id;

    MessageModel.findById({ _id }, (err, message) => {
      if (err || !message) {
        return res.status(404).json(err);
      }

      const dialogId = message.dialog;
      this.io.emit("REMOVE_MESSAGE", message);

      message.remove();

      MessageModel.findOne({ dialog: dialogId })
        .sort({ createdAt: -1 })
        .exec((err, lastMessage) => {
          if (err || !lastMessage) {
            return res.status(404).json(err);
          }

          DialogModel.findById(dialogId, (err, dialog) => {
            if (err || !dialog) {
              return res.status(404).json(err);
            }
            dialog.lastMessage = lastMessage._id;
            dialog.save();

            res.json({
              message: "Message removed successfully",
            });
            this.io.emit("UPDATE_LAST_MESSAGE", lastMessage);
          });
        });
    });
  }
}
export default MessageController;
