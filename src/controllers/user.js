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

export { register, login };
