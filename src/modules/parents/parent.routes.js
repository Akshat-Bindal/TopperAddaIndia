import express from "express";
import {
    createParent,
    getParents,
    getParentById,
    updateParent,
    deleteParent
} from "./parent.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.use(
    authorizeRoles("SCHOOL_ADMIN")
);

router.post("/", createParent);

router.get("/", getParents);

router.get("/:id", getParentById);

router.patch("/:id", updateParent);

router.delete("/:id", deleteParent);

export default router;