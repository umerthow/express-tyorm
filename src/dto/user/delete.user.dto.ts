import { Type } from "class-transformer";
import { IsArray, IsDefined, IsString, ValidateNested } from "class-validator";

export class DeleteUserDto  {
  @IsDefined()
  @IsString()
  id!: string;
}

export class BulkDeleteUserDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeleteUserDto)
  where!: DeleteUserDto[]
}