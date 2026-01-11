import jwt from "jsonwebtoken";
import "dotenv/config";
import { prisma } from "./../db/prisma.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { AppError } from "../../utils/AppError.js";

const protect = catchAsync(async (req, res, next) => {
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
      return next(
        new AppError("You are not logged in, unauthorized access", 401)
      );
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findFirst({
      where: { id: payload.id },
    });
    if (!user) return next(new AppError("unauthorized access", 401));
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
  }
});

export { protect };
