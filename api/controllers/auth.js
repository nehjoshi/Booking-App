import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const register = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).send("User has been created");
    }
    catch (err) {
        next(err);
    }
}
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found"));
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return next(createError(400, "Invalid password"));

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET)

        const {psasword, isAdmin, ...others} = user._doc;
        res.cookie("accessToken", token, {
            httpOnly: true
        })
        .status(200).json({...others});
    }catch(err) {
        next(err);
    }
}