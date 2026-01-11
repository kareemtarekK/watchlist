import express from "express";
import {
  createWatchlistItem,
  getAllWatchlistItems,
} from "./../controllers/watchlistItem.js";
const watchlistItemRouter = express.Router();

watchlistItemRouter
  .route("/")
  .post(createWatchlistItem)
  .get(getAllWatchlistItems);

export default watchlistItemRouter;
