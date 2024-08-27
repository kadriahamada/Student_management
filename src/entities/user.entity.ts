import { MainEntity } from "./mainentity";

export class UserEntity extends MainEntity<string> {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  verified: 0 | 1;
  lastloginDate: Date;
  isLocked: 0 | 1;
  gender: "Male" | "Female";
  tel: string;
  positionId: number;
}
