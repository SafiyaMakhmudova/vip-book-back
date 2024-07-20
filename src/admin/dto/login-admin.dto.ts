import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    example: 'Hello',
    description: 'Foydalanuvchi login',
  })
  @IsString()
  login: string;

  
  @ApiProperty({ example: 'Uzbek1$t0n', description: 'Foydalanuvchi  paroli' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
