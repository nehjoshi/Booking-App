import User from '../models/user.js';
import bcrypt from 'bcryptjs';
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
    catch(err) {
        next(err);
    }
}