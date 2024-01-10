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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseInterface } from 'src/response/interface/response.interface';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //

  @ApiBody({ type: CreateUserDto })
  @ApiOperation({
    summary: '회원 가입 API',
    description: '회원 가입을 합니다.',
  })
  @Post('/signup')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: '성공적으로 회원가입을 했습니다.',
    type: ResponseInterface, // 또는 응답 형식의 클래스 또는 타입
  })
  async signup(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.passwordConfirm) {
      throw new BadRequestException(
        'your password not match your passwordConfirm',
      );
    }
    return await this.userService.signup(createUserDto);
  }

  @ApiBody({ type: SigninUserDto })
  @ApiOperation({
    summary: '로그인 API',
    description: '로그인을 합니다.',
  })
  @Post('/signin')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: '성공적으로 로그인을 했습니다.',
    type: ResponseInterface, // 또는 응답 형식의 클래스 또는 타입
  })
  async signin(@Body() signinUserDto: SigninUserDto) {
    return await this.userService.signin(signinUserDto);
  }

  @ApiOperation({
    summary: '내 정보 조회 API',
    description: '나의 정보를 조회합니다.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/myinfo')
  @ApiResponse({
    status: 200,
    description: '성공적으로 내정보를 조회 했습니다.',
    type: ResponseInterface, // 또는 응답 형식의 클래스 또는 타입
  })
  async getMyInfo(@GetUser() user: User) {
    console.log(user);
    return {
      code: 200,
      message: 'you successfully get your profile',
      email: user.email,
      nick: user.nick,
    };
  }

  @ApiOperation({
    summary: '회원탈퇴 API',
    description: '회원탈퇴를 합니다.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/myaccount')
  @ApiResponse({
    status: 200,
    description: '성공적으로 회원탈퇴를 했습니다.',
    type: ResponseInterface, // 또는 응답 형식의 클래스 또는 타입
  })
  async withdraw(@GetUser() user: User) {
    return await this.userService.withdraw(user);
  }

  @ApiBody({
    schema: {
      properties: {
        nick: { type: 'string', example: 'updatedNick' },
      },
    },
  })
  @ApiOperation({
    summary: '내 정보 수정 API',
    description: '내 정보를 수정 합니다.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 200,
    description: '성공적으로 내 정보를 수정 했습니다.',
    type: ResponseInterface, // 또는 응답 형식의 클래스 또는 타입
  })
  @Patch('/myinfo')
  async patchMyInfo(@GetUser() user: User, @Body('nick') nick: string) {
    return await this.userService.patchMyInfo(user, nick);
  }
}
