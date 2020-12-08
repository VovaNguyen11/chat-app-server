const socket = require("socket.io");
import { Server, Socket } from "socket.io";
import http from "http";

interface CustomSocket extends Socket {
  dialogId: string;
}

export default (http: http.Server): Server => {
  const io = socket(http, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket: CustomSocket) => {
    socket.on("DIALOGS:JOIN", (dialogId: string) => {
      socket.dialogId = dialogId;
      socket.join(dialogId);
    });
    socket.on("DIALOGS:TYPING", (dialogid: string) => {
      socket.broadcast.emit("DIALOGS:TYPING", dialogid);
    });
  });

  return io;
};
