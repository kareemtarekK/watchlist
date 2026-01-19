import { prisma } from "./../db/prisma.js";
import { catchAsync } from "./../../utils/catchAsync.js";
import { AppError } from "./../../utils/AppError.js";

const createMovie = catchAsync(async (req, res) => {
  const {
    title,
    overview,
    releaseYear,
    geners,
    runtime,
    posterUrl,
    createdBy,
  } = req.body;

  const movie = await prisma.movie.create({
    data: {
      title,
      overview,
      releaseYear,
      geners,
      runtime,
      posterUrl,
      createdBy,
    },
  });

  res.status(201).json({
    status: "success",
    data: {
      movie,
    },
  });
});

const getAllMovies = catchAsync(async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      user: true,
    },
  });
  res.status(200).json({
    status: "success",
    length: movies.length,
    data: {
      movies,
    },
  });
});

const getMovie = catchAsync(async (req, res, next) => {
  const { movieId } = req.params;
  if (!movieId) return next(new AppError("No movie id found on request", 404));
  const movie = await prisma.movie.findFirst({
    where: { id: movieId },
  });
  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
});

export { createMovie, getAllMovies, getMovie };
