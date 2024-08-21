import { Request } from "express";
import { MainEntity } from "src/entities/mainentity";

export interface IModel<
  T extends MainEntity<R>,
  R extends String | Number = number
> {
  entity: T;
  request: Request;
}
