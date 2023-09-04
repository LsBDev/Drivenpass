import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  
  constructor(private readonly usersRepository: UsersRepository) {};

  async create(createUser: CreateUserDto) {
    const {email} = createUser;
    const userExist = await this.usersRepository.findUserByEmail(email)
    if(userExist) throw new HttpException("E-mail already registered", HttpStatus.CONFLICT);
    
    return await this.usersRepository.create(createUser);
  }
  
  async findAll() {
    return await this.usersRepository.findAll();
  }
  
  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    if(!user) throw new HttpException("User not found", HttpStatus.FORBIDDEN)
    
    return user;
  }
  
  getUserByEmail(email: string) {
    return this.usersRepository.findUserByEmail(email)
  }
  
  async update(id: number, updateUser: UpdateUserDto) {
    await this.findOne(id);

    const {email} = updateUser;
    const userExist = await this.usersRepository.findUserByEmail(email)
    if(userExist) throw new HttpException("E-mail already registered", HttpStatus.CONFLICT);
    
    return await this.usersRepository.update(id, updateUser)
  }

  // async remove(id: number) {
  //   // Nessa função, chamar outros deletes de outros módulos?
  //   // Checar existência de usuário com o id.
  //   // Checar se existe credenciais, cartões e notas vinculadas ao usuário.
  //   return await this.usersRepository.remove(id)
  // }
}
