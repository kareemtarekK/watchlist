import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { DBconnect, DBdisconnect, prisma } from "./src/db/prisma.js";

dotenv.config({ path: "./.env" });
// console.log(process.env.DATABASE_URL);
DBconnect();

const app = express();
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("hello watchlist");
});

const port = process.env.PORT || 8080;

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`server is running on port: ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`unhandled rejection error ${err.message}`);
  server.close(async () => {
    console.log("shut down server");
    await DBdisconnect();
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`uncaught exception error ${err.message}`);
  server.close(async () => {
    console.log("shut down server");
    await DBdisconnect();
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("signal term ✅");
  server.close(async () => {
    console.log("shut down server gratfully");
    await DBdisconnect();
    process.exit(0);
  });
});
