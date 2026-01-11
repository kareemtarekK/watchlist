import express from "express";
import {
  register,
  login,
  getallUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./../controllers/user.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.get("/", getallUsers);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
