import express from "express";
import { createMovie, getAllMovies } from "./../controllers/movie.js";
import { protect } from "./../auth/protect.js";

const movieRouter = express.Router();

movieRouter.route("/").post(createMovie).get(protect, getAllMovies);

export default movieRouter;
