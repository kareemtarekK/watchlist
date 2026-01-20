import express from "express";
import {
  createWatchlistItem,
  getAllWatchlistItems,
} from "./../controllers/watchlistItem.js";

import { validateRequest } from "../validation/validateRequest.js";

import movieWatchlistItemSchema from "../validation/validators/movieWatchlistItem.js";

const watchlistItemRouter = express.Router();

watchlistItemRouter
  .route("/")
  .post(validateRequest(movieWatchlistItemSchema), createWatchlistItem)
  .get(getAllWatchlistItems);

export default watchlistItemRouter;
