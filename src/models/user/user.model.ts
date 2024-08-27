import { UserEntity } from "../../entities/user.entity";
import { Model } from "../model";

export class UserModel extends Model<UserEntity, string> {
  constructor() {
    super(UserEntity, "users");
  }
  async AddUser() {
    return this.Create();
  }
}
