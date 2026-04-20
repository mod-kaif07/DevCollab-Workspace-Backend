import ProjectModel from "../models/project.model.js";
import {
  createProject,
  getAllProjectsUser,
  addUserToProjectservice,
  updateFileTree,
} from "../services/project.service.js";
import UserModel from "../models/user.models.js";
import { validationResult } from "express-validator";

export const createProjectcontroller = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const loggedInUser = await UserModel.findOne({ email: req.user.email });
    const userId = loggedInUser._id;

    const newProject = await createProject({ name, userId });

    res.status(201).json(newProject);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

export const getAllProjectsController = async (req, res) => {
  try {
    const loggInUser = await UserModel.findOne({ email: req.user.email });
    const userId = loggInUser._id;
    const allUserProjects = await getAllProjectsUser({ userId });
    return res.status(200).json(allUserProjects);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

export const addUserToProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectId, users } = req.body;
    const loggedInUser = await UserModel.findOne({ email: req.user.email });
    const project = await addUserToProjectservice({
      projectId,
      users,
      userid: loggedInUser._id,
    });
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export const getprojectbyID = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await ProjectModel.findById(projectId).populate("user");
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export const updateFileTrees = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectId, fileTree, buildCommand, startCommand } = req.body;

    const project = await updateFileTree({
      projectId,
      fileTree,
      buildCommand,
      startCommand,
    });
    return res.status(200).json({
      project,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
