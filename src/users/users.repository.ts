import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersRepository {
  
  private SALT = 10;
  constructor(private readonly prisma: PrismaService) {}

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  create(createUser: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...createUser,
        password: bcrypt.hashSync(createUser.password, this.SALT) // Encriptando a senha para guardar no banco. 
      }
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: {id}
    })
  }

  update(id: number, updateUser: UpdateUserDto) {
    return this.prisma.user.update({
      where: {id}, 
      data: updateUser
    })
  }

  // remove(id: number) {
  //   return this.prisma.user.delete({
  //     where: {id}
  //   })
  // }
}
