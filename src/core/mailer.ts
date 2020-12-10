require("dotenv").config();
import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_LOGIN,
    pass: process.env.GMAIL_PASS,
  },
});

export default smtpTransport;
