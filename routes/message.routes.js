import { Router } from "express";
import { body } from "express-validator";
import { createMessageController, getMessagesController } from "../controllers/message.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  authUser,
  body("projectId").notEmpty().withMessage("ProjectId is required"),
  body("message").notEmpty().withMessage("Message is required"),
  createMessageController
);

router.get("/project/:projectId", authUser, getMessagesController);

export default router; // ✅ THIS WAS MISSING