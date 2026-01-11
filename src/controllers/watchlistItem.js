import { prisma } from "./../db/prisma.js";
import { AppError } from "./../../utils/AppError.js";
import { catchAsync } from "./../../utils/catchAsync.js";

const createWatchlistItem = catchAsync(async (req, res) => {
  const { userId, movieId, rating, notes, status } = req.body;

  const watchlistItem = await prisma.watchListItem.create({
    data: { userId, movieId, rating, notes, status },
  });

  res.status(201).json({
    status: "success",
    data: {
      watchlistItem,
    },
  });
});

const getAllWatchlistItems = catchAsync(async (req, res) => {
  const watchlistItems = await prisma.watchListItem.findMany({
    select: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      movie: true,
      status: true,
      notes: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json({
    status: "success",
    length: watchlistItems.length,
    data: {
      watchlistItems,
    },
  });
});

export { createWatchlistItem, getAllWatchlistItems };
