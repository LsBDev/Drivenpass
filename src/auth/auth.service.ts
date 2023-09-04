import { Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) { };

  async signUp(signUpDto: SignUpDto) {
    return await this.usersService.create(signUpDto);
  }
  
  async signIn(signInDto: SignInDto) {
    const {email, password} = signInDto;
    const userExist = await this.usersService.getUserByEmail(email)
    if (!userExist) throw new UnauthorizedException("Email or password not valid")

    const pass = bcrypt.compare(password, userExist.password)
    if(!pass) throw new UnauthorizedException("Email or password not valid")

    //Autenticação com TOKEN JWT => Substitui o UUID
    return this.createToken(userExist);

  }

  createToken(userExist: User) {
    const {id, email} = userExist
    const token = this.jwtService.sign({email, id})
    return {token: token}
  }
}
