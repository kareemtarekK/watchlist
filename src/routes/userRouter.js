import express from "express";
import {
  register,
  login,
  getallUsers,
  getUser,
  updateUser,
  deleteUser,
  logout,
} from "./../controllers/user.js";
import { protect } from "./../auth/protect.js";
const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get("/", protect, getallUsers);

userRouter.use(protect);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
