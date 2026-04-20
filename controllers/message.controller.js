import { createMessage } from "../services/message.service.js";
import messageModel from "../models/message.model.js";
import mongoose from "mongoose";
import ProjectModel from "../models/project.model.js";
import User from "../models/user.models.js";


export const createMessageController = async (req, res) => {
  try {
    const { projectId, message } = req.body;
    const loggedInUser = req.user;

    console.log("USER:", req.user);
    if (!loggedInUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!projectId || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = loggedInUser.id;

    const newMessage = await createMessage({
      projectId,
      userId,
      message,
    });

    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};



export const getMessagesController = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ message: "ProjectId is required" });
    }

    const messages = await messageModel.find({ projectId })
      .sort({ createdAt: 1 }) // oldest → newest
      .populate("userId", "email"); // optional (for sender name)

    res.status(200).json(messages);

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};