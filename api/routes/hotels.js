import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
const router = express.Router();

//Create
router.post("/", createHotel);
//Update
router.put("/:id", updateHotel);
//Delete
router.delete("/:id", deleteHotel);
//Get
router.post("/:id", getHotel);
//Get all
router.post("/", getHotels);

export default router;