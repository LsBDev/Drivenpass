import { IsString, MinLength, IsNotEmpty, Matches, IsStrongPassword } from "class-validator";

export class CreateUserDto {  
  @IsString()
  @IsNotEmpty({
    message: "All fields have must be filled"
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: "All fields have must be filled"
  })
  @MinLength(10)
  @IsStrongPassword()
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
  //   message: "The password must have at least 10 characters, 1 special character, 1 uppercase letter, and 1 lowercase letter"
  // })
  password: string;
}
