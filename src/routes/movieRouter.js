import express from "express";
import {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
} from "./../controllers/movie.js";
import { protect } from "./../auth/protect.js";

const movieRouter = express.Router();

movieRouter.route("/").post(createMovie).get(protect, getAllMovies);
movieRouter
  .route("/:movieId")
  .get(getMovie)
  .patch(updateMovie)
  .delete(deleteMovie);

export default movieRouter;
