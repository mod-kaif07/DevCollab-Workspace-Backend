import mongoose from "mongoose";
import ProjectModel from "../models/project.model.js";
import MessageModel from "../models/message.model.js";

export const createMessage = async ({ projectId, userId, message }) => {

  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Valid ProjectId is required");
  }

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Valid UserId is required");
  }

  if (!message || message.trim() === "") {
    throw new Error("Message is required");
  }

  const project = await ProjectModel.findOne({
    _id: projectId,
     user: userId
  });

  if (!project) {
    throw new Error("Project not found or user not authorized");
  }

  const newMessage = await MessageModel.create({
    projectId,
    userId,
    message: message.trim(),
  });

  return newMessage;
};