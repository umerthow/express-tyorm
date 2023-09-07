import { IsDefined, IsOptional, IsString } from "class-validator"

export class CreatePostsDto {
  @IsDefined()
  @IsString()
  title!: string

  @IsDefined()
  @IsString()
  content!: string

  @IsDefined()
  @IsString()
  createdById!: string

  @IsOptional()
  @IsString()
  updatedById?: string
}