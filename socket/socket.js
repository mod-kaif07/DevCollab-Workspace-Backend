import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { createMessage } from "../services/message.service.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // 🔐 Auth middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userModel.findById(decoded.id);

      socket.user = user;

      next();
    } catch (err) {
      next(new Error("Auth error"));
    }
  });

  io.on("connection", (socket) => {
    const projectId = socket.handshake.query.projectId;

    socket.join(projectId);

    socket.on("project-message", async (data) => {
      try {
        const newMessage = await createMessage({
          projectId,
          userId: socket.user._id,
          message: data.message,
        });

        io.to(projectId).emit("project-message", {
          sender: socket.user._id,
          senderEmail: socket.user.email,
          message: newMessage.message,
        });

      } catch (err) {
        console.error(err);
      }
    });
  });
};