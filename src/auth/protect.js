import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  console.log(req.cookies);
  console.log(req.headers);
  next();
};

export { protect };
