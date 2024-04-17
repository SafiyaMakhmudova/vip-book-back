import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    example: 'salima@mail.uz',
    description: 'Foydalanuvchi emaili',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  
  @ApiProperty({
    example: '+998881112233',
    description: 'Admin telefon nomeri',
  })
  @IsPhoneNumber()
  @IsOptional()
  phone_number?: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'Foydalanuvchi  paroli' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
