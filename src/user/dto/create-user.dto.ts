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
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  readonly nick: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  readonly passwordConfirm: string;
}

