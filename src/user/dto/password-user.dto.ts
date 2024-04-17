import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsStrongPassword } from "class-validator";


export class CreateUserDto {
    @ApiProperty({
        example: 'Uzbek1$t0n',
        description: 'Userning paroli',
      })
      @IsStrongPassword()
      @IsNotEmpty()
      password: string;
    
      @ApiProperty({
        example: 'Uzbek1$t0n',
        description: 'Userning paroli',
      })
      @IsStrongPassword()
      @IsNotEmpty()
      confirim_password: string;
    
}
