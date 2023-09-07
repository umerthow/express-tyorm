import { Expose, Transform } from "class-transformer";
import { IsDefined, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { RoleEnum } from "../../utils/roles";

export class UserDto {
  @IsDefined()
  @Expose()
  @IsString()
  name!: string;

  @IsOptional()
  @Transform(({ value }) => ("" + value).toUpperCase())
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @IsEmail()
  email!: string;
}