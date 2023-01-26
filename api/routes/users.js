import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
const router = express.Router();

//Update
router.put("/:id", updateUser);
//Delete
router.delete("/:id", deleteUser);
//Get
router.post("/:id", getUser);
//Get all
router.post("/", getUsers);

export default router;