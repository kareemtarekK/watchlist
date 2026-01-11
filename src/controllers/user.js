import bcrypt from "bcryptjs";
import "dotenv/config";
import { prisma } from "./../db/prisma.js";
import { generateToken } from "./../config/token.js";

const register = async (req, res) => {
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
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({
      status: "fail",
      message: "email and password are required",
    });

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user)
    return res.status(401).json({
      status: "fail",
      message: "email or password is not correct",
    });

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword)
    return res.status(401).json({
      status: "fail",
      message: "email or password is not correct",
    });

  const token = generateToken(res, user);

  res.status(200).json({
    status: "success",
    data: {
      user: { ...user, password: undefined },
      token,
    },
  });
};

const getallUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json({
    status: "success",
    length: users.length,
    data: {
      users,
    },
  });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({
      status: "fail",
      message: "provide id to get user",
    });
  const user = await prisma.user.findFirst({
    where: { id },
  });
  if (!user)
    return res.status(400).json({
      status: "fail",
      message: "No user found with that id",
    });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!id)
    return res.status(400).json({
      status: "fail",
      message: "provide id to get user",
    });
  const user = await prisma.user.findFirst({
    where: { id },
  });
  if (!user)
    return res.status(400).json({
      status: "fail",
      message: "No user found with that id",
    });
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { name },
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
};

export { register, login };
