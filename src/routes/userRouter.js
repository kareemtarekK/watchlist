import express from "express";
import { register, login } from "./../controllers/user.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.route("/:id");

export default userRouter;
