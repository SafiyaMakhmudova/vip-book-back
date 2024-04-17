import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";


export class CreateUserDto {
    @ApiProperty({
        example: '+998901234567',
        description: 'Userning telefon raqami',
      })
      @IsPhoneNumber()
      @IsNotEmpty()
      phone_number: string;
    
}
