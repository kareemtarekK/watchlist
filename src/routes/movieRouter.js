import express from "express";
import {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
} from "./../controllers/movie.js";

import { protect } from "./../auth/protect.js";

import { validateRequest } from "../validation/validateRequest.js";

import movieValidationSchema from "../validation/validators/movieValidation.js";

const movieRouter = express.Router();

movieRouter
  .route("/")
  .post(protect, validateRequest(movieValidationSchema), createMovie)
  .get(getAllMovies);
movieRouter
  .route("/:movieId")
  .get(getMovie)
  .patch(protect, updateMovie)
  .delete(protect, deleteMovie);

export default movieRouter;
