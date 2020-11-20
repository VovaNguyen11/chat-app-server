import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.DB_CONNECTION!;

mongoose.connect(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      throw Error(`${err}`);
    }
  }
);
