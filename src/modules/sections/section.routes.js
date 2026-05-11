import express from "express";
import {
    createSection,
    getSections,
    getSectionById,
    updateSection,
    deleteSection
} from "./section.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.use(
    authorizeRoles("SCHOOL_ADMIN")
);

router.post("/", createSection);

router.get("/", getSections);

router.get("/:id", getSectionById);

router.patch("/:id", updateSection);

router.delete("/:id", deleteSection);

export default router;