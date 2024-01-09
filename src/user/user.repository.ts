import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from './dto/signin-user.dto';

//TODO에러처리 더 고민해볼 것
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async signup(createUserDto: CreateUserDto) {
    const { nick, email, password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const exUser = await this.findOneBy({ email });
    if (exUser) {
      throw new ConflictException('이미 회원가입이 되어있는 이메일입니다.');
    }
    const user = this.create({ email, password: hashedPassword, nick });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return { code: 201, message: 'singup is finished' };
  }
  //TODO
  async signin(signinUserDto: SigninUserDto) {
    const { password, email } = signinUserDto;
    try {
      const user = await this.findOneBy({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const payload = { nick: user.nick, email };
        const accessToken: string = this.jwtService.sign(payload);
        return { accessToken };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new InternalServerErrorException('internal server error');
    }
  }

  async withdraw(user: User) {
    try {
      const deletedUser = await this.remove(user);
      if (deletedUser) {
        return { code: 200, message: 'Withdrawal successful' };
      }
    } catch (error) {
      throw new InternalServerErrorException('Withdrawal failed');
    }
    throw new NotFoundException('Not Exiting User');
  }

  async patchMyInfo(user: User, nick: string) {
    try {
      user.nick = nick;
      await this.save(user);
      return { code: 200, message: 'My info updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update my info');
    }
  }
}
