import jwt from "jsonwebtoken";
import "dotenv/config";
import { prisma } from "./../db/prisma.js";

const protect = async (req, res, next) => {
  try {
    //   console.log(req.cookies);
    //   console.log(req.headers);
    //   console.log(process.env.JWT_SECRET);
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token)
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in, unauthorized access",
      });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findFirst({
      where: { id: payload.id },
    });
    if (!user)
      return res.status(401).json({
        status: "fail",
        message: "unauthorized access",
      });
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
  }
};

export { protect };
