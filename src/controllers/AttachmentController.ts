import { Request, Response } from "express";
import { v2 } from "cloudinary";
import "../core/cloudinary";

import { AttachmentModel } from "../models";

class AttachmentController {
  create(req: Request, res: Response) {
    const userId = req.user?._id;
    const file = req.file;

    v2.uploader
      .upload_stream({ resource_type: "auto" }, (err, result) => {
        if (err || !result) {
          return res.status(500).json(err);
        }
        const fileData = {
          fileName: result.original_filename,
          size: result.bytes,
          ext: result.format,
          url: result.secure_url,
          user: userId,
        };
        const attachment = new AttachmentModel(fileData);

        attachment
          .save()
          .then((file) => res.json(file))
          .catch((err) => res.status(403).json(err));
      })
      .end(file?.buffer);
  }
}
export default AttachmentController;
