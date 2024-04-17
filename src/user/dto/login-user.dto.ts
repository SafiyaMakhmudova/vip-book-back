import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsEmail, IsOptional, IsStrongPassword } from "class-validator";


export class CreateUserDto {
    @ApiProperty({
        example: '+998901234567',
        description: 'Userning telefon raqami',
      })
      @IsPhoneNumber()
      @IsOptional()
      phone_number?: string;
    
      @ApiProperty({
        example: 'user@mail.uz',
        description: 'Userning emaili',
      })
      @IsEmail()
      @IsOptional()
      email?: string;
    
      @ApiProperty({
        example: 'Uzbek1$t0n',
        description: 'Userning paroli',
      })
      @IsStrongPassword()
      @IsNotEmpty()
      password: string;
    



}
