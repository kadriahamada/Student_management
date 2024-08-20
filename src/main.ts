import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "express-async-errors";
import MainRouter from "./routes/main.route";
import { Logger } from "./middlewares/logger.middleware";
import { NotFound } from "./middlewares/notfound.middleware";
import { ErrorHandler } from "./middlewares/errorhandler.moddleware";
const app = express();
app.use(Logger);

app.get("/", async (req, res) => {
  return res.json({ msg: "Hello World" });
});
app.use(MainRouter);

app.use(NotFound);

app.use(ErrorHandler);
app.listen(4000, async () => {
  console.log("server is running on port 4000");
});
