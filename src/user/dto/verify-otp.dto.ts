import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({ example: '+998901112233', description: 'Userning telefon raqami' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({ example: 'svdfgdfg454', description: 'Userning verifikatsiya kaliti' })
  @IsString()
  @IsNotEmpty()
  verification_key: string;

  @ApiProperty({ example: '34567', description: 'Userga jonatilgan kod' })
  @IsNumberString()
  otp: string;
}
