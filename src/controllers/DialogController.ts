import { Request, Response } from "express";

import DialogModel from "../models/Dialog";
import MessageModel from "../models/Message";

class DialogController {
  index(req: Request, res: Response) {
    const userId = req.user?._id;
    DialogModel.find()
      .or([{ author: userId }, { partner: userId }])
      .populate(["author", "partner"])
      .exec((err, dialogs) => {
        if (err) {
          return res.status(404).json({
            message: "Dialogs not found",
          });
        }
        return res.json(dialogs);
      });

    // DialogModel.find()
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
    const { author, partner, text } = req.body;

    const dialog = new DialogModel({ author, partner });

    dialog
      .save()
      .then((dialogObj) => {
        const message = new MessageModel({
          text,
          dialog: dialogObj._id,
          user: author,
        });

        message
          .save()
          .then(() => {
            dialogObj.lastMessage = message._id;
            dialogObj.save().then(() => res.json(dialogObj));
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  }
}
export default DialogController;
