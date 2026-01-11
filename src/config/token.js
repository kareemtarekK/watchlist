import "dotenv/config";
import jwt from "jsonwebtoken";

// console.log(process.env.NODE_ENV);

const generateToken = (res, user) => {
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "strict",
  });
  return token;
};

export { generateToken };
