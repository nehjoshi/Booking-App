import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
dotenv.config();
const app = express();

// Connect to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to DB");
    }
    catch (err) {
        throw err;
    }
}

//Middleware
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong";
    return res.status(errStatus).send({
        status: errStatus,
        message: errMessage,
        stack: err.stack
    })
})


app.listen(5000, () => {
    connect();
    console.log("Server started on port 5000");
})