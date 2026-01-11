import express from "express";
import { createMovie, getAllMovies } from "./../controllers/movie.js";

const movieRouter = express.Router();

movieRouter.route("/").post(createMovie).get(getAllMovies);

export default movieRouter;
