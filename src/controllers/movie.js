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
  console.log("hello");
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
    include: {
      user: true,
    },
    // select: {
    //   createdAt: false,
    //   updatedAt: false,
    //   geners: true,
    // },
  });
  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
});

const updateMovie = catchAsync(async (req, res, next) => {
  const { movieId } = req.params;
  const {
    title,
    overview,
    releaseYear,
    geners,
    runtime,
    posterUrl,
    createdBy,
  } = req.body;
  if (!movieId) return next(new AppError("No movie id found on request", 404));
  const movie = await prisma.movie.findFirst({
    where: { id: movieId },
  });
  if (!movie) return next(new AppError("No movie with this id", 400));
  const created = await prisma.user.findFirst({
    where: { id: createdBy },
  });
  if (!created) return next(new AppError("No user with that id ", 404));
  const updatedMovie = await prisma.movie.update({
    where: { id: movieId },
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
  res.status(200).json({
    status: "success",
    data: {
      movie: updatedMovie,
    },
  });
});

const deleteMovie = catchAsync(async (req, res, next) => {
  const { movieId } = req.params;
  if (!movieId) return next(new AppError("No movie id found on request", 404));
  const movie = await prisma.movie.findFirst({
    where: { id: movieId },
  });
  if (!movie) return next(new AppError("No movie with this id", 400));
  const deletedMovie = await prisma.movie.delete({
    where: { id: movieId },
  });
  res.status(200).json({
    status: "success",
    data: {
      movie: deletedMovie,
    },
  });
});

export { createMovie, getAllMovies, getMovie, updateMovie, deleteMovie };
