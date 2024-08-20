import { Request, Response } from "express";

export const NotFound = (req: Request, res: Response) => {
  res.status(200).json({ msg: "Resource is Not Found" });
};
