import { Request } from "express";
import { CustomError } from "src/app/errorhandler/errorhandler";
import { CONNECT_DB, dbInstance } from "src/db/connection";
import { MainEntity } from "src/entities/mainentity";
import { IModel } from "src/interfaces/model.interface";
import { Constructor } from "src/types/general.type";

export class Model<T extends MainEntity<R>, R extends String | Number = number>
  implements IModel<T, R>
{
  public entity: T;
  private db: CONNECT_DB;
  public request: Request;
  constructor(entity: Constructor<T>, private table: string) {
    this.entity = new entity();
    this.db = dbInstance;
  }

  protected Create() {
    try {
      this.entity.creationDate = new Date();
      return this.entity;
    } catch (error) {
      throw new CustomError(error.message, 400, error.stack);
    }
  }
}
