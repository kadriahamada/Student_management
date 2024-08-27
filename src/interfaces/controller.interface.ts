import { Request, Response } from "express";

export interface IController {
  Update?(req: Request, res: Response): void;
  Delete?(req: Request, res: Response): void;
  Create(req: Request, res: Response): void;
  ViewAll(req: Request, res: Response): void;
  ViewOne(req: Request, res: Response): void;
}
