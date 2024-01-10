import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  BadRequestException,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.passwordConfirm) {
      throw new BadRequestException(
        'your password not match your passwordConfirm',
      );
    }
    return await this.userService.signup(createUserDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() signinUserDto: SigninUserDto) {
    return await this.userService.signin(signinUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/myinfo')
  async getMyInfo(@GetUser() user: User) {
    console.log(user);
    return {
      code: 200,
      message: 'you successfully get your profile',
      email: user.email,
      nick: user.nick,
    };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/myaccount')
  async withdraw(@GetUser() user: User) {
    return await this.userService.withdraw(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Patch('/myinfo')
  async patchMyInfo(@GetUser() user: User, @Body('nick') nick: string) {
    return await this.userService.patchMyInfo(user, nick);
  }
}
