import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John Adam', description: 'Admin ismi' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: 'admin@mail.uz', description: 'Admin email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

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

  @ApiProperty({
    example: '+998881112233',
    description: 'Admin telefon nomeri',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: string;
}
