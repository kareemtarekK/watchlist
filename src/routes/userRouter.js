import express from "express";
import { register } from "./../controllers/user.js";
const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.route("/:id");

export default userRouter;
