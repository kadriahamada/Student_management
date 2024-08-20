import { Request, Response } from "express";

export const ErrorHandler = (err: any, req: Request, res: Response, next) => {
  res.status(400).json({ error: err });
};
