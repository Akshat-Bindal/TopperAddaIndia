import express from "express";
import {

    markAttendance,
    getClassAttendance,
    getStudentAttendance

} from "./attendance.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.use(
    authorizeRoles(
        "SCHOOL_ADMIN",
        "TEACHER"
    )
);


router.post("/mark",markAttendance);
router.get("/class",getClassAttendance);
router.get("/student/:id",getStudentAttendance);

export default router;