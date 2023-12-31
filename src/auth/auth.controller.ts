import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {};

  @Post("/sign-up")
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
    
  }
  
  @Post("/sign-in")
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);

  }

}
