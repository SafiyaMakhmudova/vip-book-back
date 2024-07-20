import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateAdminYourselfDto {
  @ApiProperty({ example: 'salima salimova', description: 'Admin ismi' })
  @IsString()
  @IsOptional()
  full_name?: string;


  @ApiProperty({ example: 'chilonzor 11', description: 'Admin manzili' })
  @IsString()
  @IsOptional()
  address?: string;



  @ApiProperty({
    example: '+998881112233',
    description: 'Admin telefon raqami',
  })
  @IsPhoneNumber()
  @IsOptional()
  phone_number?: string;

}
