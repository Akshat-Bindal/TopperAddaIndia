import express from "express";

import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
} from "./teacher.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.use(authorizeRoles("SCHOOL_ADMIN"));

router.post("/", createTeacher);

router.get("/", getTeachers);

router.get("/:id", getTeacherById);

router.patch("/:id", updateTeacher);

router.delete("/:id", deleteTeacher);

export default router;