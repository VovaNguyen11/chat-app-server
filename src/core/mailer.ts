require("dotenv").config();
import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export default smtpTransport;
