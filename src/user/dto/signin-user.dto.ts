import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SigninUserDto {
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

  @IsEmail()
  @IsNotEmpty()
<<<<<<< HEAD
  @ApiProperty({ description: '이메일', example: 'test123456@email.com' })
=======
  @ApiProperty({ description: '이메일' })
>>>>>>> 959359f07429aed6282a172ca52248b0ae338b82
  readonly email: string;
}
