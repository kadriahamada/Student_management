import express from "express";
import { UserController } from "src/controllers/users/user.controller";

const UserRouter = express.Router();
const controller = new UserController();

UserRouter.route("/").post(controller.Create);

export default UserRouter;
