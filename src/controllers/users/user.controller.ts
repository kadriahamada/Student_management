import { Request, Response } from "express";
import { IController } from "./src/interfaces/controller.interface";
import { UserModel } from "./src/models/user/user.model";

export class UserController implements IController {
  private model: UserModel;
  constructor() {
    this.model = new UserModel();
  }
  async Create(req: Request, res: Response) {
    const response = await this.model.AddUser();
    res.status(200).json(response);
  }
  ViewAll(req: Request, res: Response): void {}
  ViewOne(req: Request, res: Response): void {}
}
