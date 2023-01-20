import express from "express";
import Hotel from "../models/Hotel.js";
const router = express.Router();

//Create
router.post("/", async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(err) {
        next(err);
    }
});
//Update
router.put("/:id", async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true }); //New true returns the updated object
        res.status(200).json(updatedHotel);
    }catch(err) {
        next(err);
    }
})
//Delete
router.delete("/:id", async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    }catch(err) {
        next(err);
    }
})
//Get
router.post("/:id", async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }catch(err) {
        next(err);
    }
})
//Get all
router.post("/", async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }catch(err) {
        next(err);
    }
})
export default router;