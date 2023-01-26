import express from "express";
import { login, register } from "../controllers/auth.js";
const router = express.Router();

router.post("/", register);
router.post("/", login);
export default router;