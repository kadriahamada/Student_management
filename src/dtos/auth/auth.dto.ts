import { Gender, UserTypes } from "../../types/enums/enum";
import {
  Contains,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  Length,
  Matches,
} from "class-validator";

const regex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
export class UserDTO {
  // @IsString()
  // @Length(3, 20)
  // firstName: string;
  // @IsString()
  // @Length(3, 20)
  // lastName: string;
  // @IsEmail()
  // email: string;
  // @IsString()
  // @Length(6, 20)
  // @Matches(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
  //   message:
  //     "Password must contain at least one lowercase letter and one number",
  // })
  // password: string;
  // @IsDate()
  // lastLoginDate: Date;
  // @IsEnum(UserTypes)
  // userType: UserTypes;
  // @IsNumber()
  // verified: number;
  // @IsNumber()
  // isLocked: number;
  // @IsEnum(Gender)
  // gender: Gender;
  // @IsString()
  // @Contains("+256")
  // tel: string;
  // @IsNumber()
  // positionId: number;
}
