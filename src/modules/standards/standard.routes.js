import express from "express";
import {
    createStandard,
    getStandards,
    getStandardById,
    updateStandard,
    deleteStandard
} from "./standard.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.use(
    authorizeRoles("SCHOOL_ADMIN")
);

router.post("/", createStandard);

router.get("/", getStandards);

router.get("/:id", getStandardById);

router.patch("/:id", updateStandard);

router.delete("/:id", deleteStandard);

export default router;