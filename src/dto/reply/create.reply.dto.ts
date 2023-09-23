import { IsDefined, IsNotEmpty, IsString } from "class-validator"

export class CreateReplyDto {
  @IsDefined()
  @IsString()
  content!: string

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  postId!: string
}