import { Expose, Transform, Type } from "class-transformer";
import { IsArray, IsDefined, Length, Matches, ValidateNested } from "class-validator";
import { UserDto } from "./user.dto";

export class CreateUserDto extends UserDto {
  @IsDefined()
  @Expose()
  @Matches(RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/))
  @Length(8)
  password: string;
}