import express from "express";
import {
  register,
  login,
  getallUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./../controllers/user.js";
import { protect } from "./../auth/protect.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get("/", protect, getallUsers);

userRouter.use(protect);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
