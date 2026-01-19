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

movieRouter.route("/").post(protect, createMovie).get(getAllMovies);
movieRouter
  .route("/:movieId")
  .get(getMovie)
  .patch(protect, updateMovie)
  .delete(protect, deleteMovie);

export default movieRouter;
