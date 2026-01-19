import bcrypt from "bcryptjs";
import "dotenv/config";
import { prisma } from "./../db/prisma.js";
import { generateToken } from "./../config/token.js";
import { AppError } from "./../../utils/AppError.js";
import { catchAsync } from "./../../utils/catchAsync.js";

const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: { name, email, password: passwordHashed },
  });

  const token = generateToken(res, user);

  res.status(201).json({
    status: "success",
    data: {
      user: { ...user, password: undefined },
      token,
    },
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("email and password are required", 401));

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) return next(new AppError("email or password is not correct", 401));

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword)
    return next(new AppError("email or password is not correct", 401));

  const token = generateToken(res, user);

  res.status(200).json({
    status: "success",
    data: {
      user: { ...user, password: undefined },
      token,
    },
  });
});

const logout = catchAsync(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    maxAge: 0,
    samesite: "strict",
  });
});

const getallUsers = catchAsync(async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.status(200).json({
    status: "success",
    length: users.length,
    data: {
      users,
    },
  });
});

const getUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) return next(new AppError("provide id to get user", 400));
  const user = await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) return next(new AppError("No user found with that id", 400));
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!id) return next(new AppError("provide id to get user", 400));
  const user = await prisma.user.findFirst({
    where: { id },
  });
  if (!user) return next(new AppError("No user found with that id", 400));
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { name },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) return next(new AppError("provide id to get user", 400));
  const user = await prisma.user.findFirst({
    where: { id },
  });
  if (!user) return next(new AppError("No user found with that id", 400));
  const deletedUser = await prisma.user.delete({
    where: { id },
    select: {
      name: true,
      email: true,
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      user: deletedUser,
    },
  });
});

export {
  register,
  login,
  getallUsers,
  getUser,
  updateUser,
  deleteUser,
  logout,
};
