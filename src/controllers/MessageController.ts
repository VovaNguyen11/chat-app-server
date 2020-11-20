import { Request, Response } from "express";

import MessageModel from "../models/Message";

class MessageController {
  index(req: Request, res: Response) {
    const dialogId = req.query.dialogId as string;

    MessageModel.find({ dialog: dialogId })
      .populate(["dialog", "user"])
      .exec((err, messages) => {
        if (err) {
          return res.status(404).json({
            message: "Messages not found",
          });
        }
        return res.json(messages);
      });

    // MessageModel.find()
    //   .or([{ author: userId }, { partner: userId }])
    //   .exec(function (err, dialogs) {
    //     if (err) {
    //       return res.status(404).json({
    //         message: "Dialogs not found",
    //       });
    //     }
    //     return res.json(dialogs);
    //   });
  }

  create(req: Request, res: Response) {
    // const userId: string | undefined = req.user?._id;
    const userId: string = "5fb3a42fa2e18adee494a3aa";
    const { text, dialogId } = req.body;

    const postData = { text, dialog: dialogId, user: userId };

    const message = new MessageModel(postData);

    message
      .save()
      .then((obj) => res.json(obj))
      .catch((err) => res.json(err.message));
  }

  delete(req: Request, res: Response) {
    const id = req.params.id;
    MessageModel.findOneAndDelete({ _id: id })
      .then((message) => {
        if (message) {
          res.json({
            message: "Message deleted successfully",
          });
        }
      })
      .catch((err) => res.json(err));
  }
}
export default MessageController;
