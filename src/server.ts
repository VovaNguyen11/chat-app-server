import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";

import createSocket from "./core/socket";
import createRoutes from "./core/routes";
import "./core/db";

dotenv.config();

const app = express();
const http = createServer(app);
const io = createSocket(http);

createRoutes(app, io);

const port: number = Number(process.env.PORT) || 3003;

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
