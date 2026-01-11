import { prisma } from "./../db/prisma.js";
import { catchAync } from "./../../utils/catchAsync.js";
import { AppError } from "./../../utils/AppError.js";

const createMovie = catchAync(async (req, res) => {
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

const getAllMovies = catchAync(async (req, res) => {
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

export { createMovie, getAllMovies };
