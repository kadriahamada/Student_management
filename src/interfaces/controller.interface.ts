import { NextFunction, Request, Response } from "express";

export interface IController {
  Update?(req: Request, res: Response, next?: NextFunction): void;
  Delete?(req: Request, res: Response, next?: NextFunction): void;
  Create(req: Request, res: Response, next?: NextFunction): void;
  ViewAll(req: Request, res: Response, next?: NextFunction): void;
  ViewOne(req: Request, res: Response, next?: NextFunction): void;
}
