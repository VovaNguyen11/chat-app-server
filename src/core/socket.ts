const socket = require("socket.io");
import { Server } from "socket.io";
import http from "http";

export default (http: http.Server): Server => {
  const io = socket(http, {
    cors: {
      origin: "*",
    },
  });

  return io;
};
