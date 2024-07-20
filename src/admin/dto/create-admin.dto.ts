import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John Adam', description: 'Admin ismi' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: 'hello', description: 'Admin login' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: '+998901112233', description: 'Admin telefon raqami' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'Admin paroli' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'Uzbek1$t0n',
    description: 'Admin qayta kiritadigan paroli',
  })
  @IsNotEmpty()
  @IsString()
  confirim_password: string;


  @ApiProperty({ example: 'chilonzor', description: 'Admin manzili' })
  @IsString()
  @IsNotEmpty()
  address: string;

}
