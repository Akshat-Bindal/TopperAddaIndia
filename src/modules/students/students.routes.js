import express from "express";
import {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} from "./students.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.use(
    authorizeRoles("SCHOOL_ADMIN")
);

router.post("/", createStudent);

router.get("/", getStudents);

router.get("/:id", getStudentById);

router.patch("/:id", updateStudent);

router.delete("/:id", deleteStudent);

export default router;