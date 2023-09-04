import { IsNotEmpty, IsString } from "class-validator";

export class CreateCredentialDto {
  @IsString()
  @IsNotEmpty({
    message: "All fields have must be filled"
  })
  title: string

  @IsString()
  @IsNotEmpty({
    message: "All fields have must be filled"
  })
  user: string

  @IsString()
  @IsNotEmpty({
    message: "All fields have must be filled"
  })
  password: string
}
