import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Nabiev Ali', description: 'Userning ismi' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '+998901112233', description: 'Userning telefon raqami' })
  @IsPhoneNumber()
  @IsOptional()
  phone_number?: string;


}
