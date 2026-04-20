import mongoose from "mongoose";
import ProjectModel from "../models/project.model.js";

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Name is required");
  }
  if (!userId) {
    throw new Error("UserId is required");
  }

  let project;
  try {
    project = await ProjectModel.create({
      name,
      user: [userId],
    });
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Project name already exists");
    }
    throw error;
  }

  return project;
};

export const getAllProjectsUser = async ({ userId }) => {
  if (!userId) {
    throw new Error("UserId is required");
  }
  const getAllprojects = await ProjectModel.find({ user: userId });
  return getAllprojects;
};

export const addUserToProjectservice = async ({ projectId, users, userid }) => {
  if (!projectId) {
    throw new Error("Project Id Required");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid Project ID");
  }
  if (!users || !Array.isArray(users) || users.length === 0) {
    throw new Error("Users array is required");
  }
  if (
    !Array.isArray(users) ||
    users.some((userId) => !mongoose.Types.ObjectId.isValid(userId))
  ) {
    throw new Error("Invalid userId(s) in users array");
  }

  if (!userid) {
    throw new Error("Your UserId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(userid)) {
    throw new Error("Invalid Your UserId");
  }
  const project = await ProjectModel.findOne({
    _id: projectId,
    user: userid,
  });

  if (!project) {
    throw new Error("You are not authorized to add users to this project");
  }

  const updatedProject = await ProjectModel.findByIdAndUpdate(
    { _id: projectId

     },
    {
         $addToSet: { user: { $each: users } } },
    { new: true },
  );
  return updatedProject;
};


// project.service.js - update the function signature and update call
export const updateFileTree = async ({ projectId, fileTree, buildCommand, startCommand }) => {
    if (!projectId) throw new Error("projectId is required");
    if (!mongoose.Types.ObjectId.isValid(projectId)) throw new Error("Invalid projectId");
    if (!fileTree) throw new Error("fileTree is required");

    const project = await ProjectModel.findOneAndUpdate(  // ✅ capital P
        { _id: projectId },
        { fileTree, buildCommand, startCommand },          // ✅ save all three
        { new: true }
    );
    return project;
};