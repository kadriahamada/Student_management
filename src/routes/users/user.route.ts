import express from "express";

const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World" });
});

export default UserRouter;
