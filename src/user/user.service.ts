import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async signup(createUserDto: CreateUserDto) {
    return await this.userRepository.signup(createUserDto);
  }

  async signin(signinUserDto: SigninUserDto) {
    return await this.userRepository.signin(signinUserDto);
  }

  async withdraw(user: User) {
    return await this.userRepository.withdraw(user);
  }

  async patchMyInfo(user: User, nick: string) {
    return await this.userRepository.patchMyInfo(user, nick);
  }
}
