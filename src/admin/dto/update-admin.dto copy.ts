import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Role } from '../models/admin.model';

export class UpdateAdminDto {
  @ApiProperty({ example: 'salima salimova', description: 'Admin ismi' })
  @IsString()
  @IsOptional()
  full_name?: string;


  @ApiProperty({ example: 'chilonzor 11', description: 'Admin manzili' })
  @IsString()
  @IsOptional()
  address?: string;

  
  @ApiProperty({ example: 'salima@mail.uz', description: 'Admin emaili' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '+998881112233',
    description: 'Admin telefon raqami',
  })
  @IsPhoneNumber()
  @IsOptional()
  phone_number?: string;

  @ApiProperty({ example: "ADMIN", description: 'Super admin bo\'lishi yokioddiy admin bo\'lishi' })
  @IsOptional()
  role?: Role;
  
  @ApiProperty({ example: false, description: 'Activ yoki avtiv emasligi' })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

}
