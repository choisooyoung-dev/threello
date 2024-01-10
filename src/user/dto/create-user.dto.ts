import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
<<<<<<< HEAD
  @ApiProperty({ description: '이메일', example: 'test123456@email.com' })
=======
  @ApiProperty({ description: '이메일' })
>>>>>>> 959359f07429aed6282a172ca52248b0ae338b82
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
<<<<<<< HEAD
  @ApiProperty({ description: '닉네임', example: 'testNick' })
=======
  @ApiProperty({ description: '닉네임' })
>>>>>>> 959359f07429aed6282a172ca52248b0ae338b82
  readonly nick: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
<<<<<<< HEAD
  @ApiProperty({ description: '비밀번호', example: 'testpassword' })
=======
  @ApiProperty({ description: '비밀번호' })
>>>>>>> 959359f07429aed6282a172ca52248b0ae338b82
  readonly password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
<<<<<<< HEAD
  @ApiProperty({ description: '비밀번호 재확인', example: 'testpassword' })
=======
  @ApiProperty({ description: '비밀번호 재확인' })
>>>>>>> 959359f07429aed6282a172ca52248b0ae338b82
  readonly passwordConfirm: string;
}
