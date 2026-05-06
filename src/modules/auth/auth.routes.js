import express from "express"

import { registerSchool } from "./auth.controller.js";
import { login } from "./auth.controller.js";

const router = express.Router()

router.post('/register-school',registerSchool);
router.post('/login',login);

export default router;
