import { prisma } from "./../db/prisma.js";
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: { name, email, password },
  });
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
};

export { register };
