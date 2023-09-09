import { IsDefined, IsOptional, IsString } from "class-validator"

export class UpdatePostsDto {
  @IsDefined()
  @IsString()
  title!: string

  @IsDefined()
  @IsString()
  content!: string

  @IsOptional()
  @IsString()
  updatedById!: string
}