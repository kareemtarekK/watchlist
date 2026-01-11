import express from "express";
import { createMovie, getAllMovies } from "./../controllers/movie.js";
import { protect } from "./../auth/protect.js";

const movieRouter = express.Router();

movieRouter
  .route("/")
  .post(createMovie)
  .get(
    protect,
    (req, res, next) => {
      next(new Error("hello"));
    },
    getAllMovies
  );

export default movieRouter;
