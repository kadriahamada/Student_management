import express from "express";
import UserRouter from "./users/user.route";

const MainRouter = express.Router();
MainRouter.use("/users", UserRouter);

export default MainRouter;
