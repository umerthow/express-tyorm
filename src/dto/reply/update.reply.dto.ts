import { IsDefined, IsNotEmpty, IsString } from "class-validator"

export class UpdateReplyDto {
  @IsDefined()
  @IsString()
  content!: string

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  postId!: string
}