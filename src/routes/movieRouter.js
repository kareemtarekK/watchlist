import express from "express";
import { createMovie, getAllMovies } from "./../controllers/movie.js";
import { protect } from "./../auth/protect.js";

const movieRouter = express.Router();

movieRouter.route("/").post(createMovie).get(protect, getAllMovies);
movieRouter.route("/:movieId").get().patch().delete();

export default movieRouter;
