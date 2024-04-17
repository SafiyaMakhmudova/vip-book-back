import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryMaxDto {
    @ApiProperty({example:'Fiction', description:"Category nomi"})
    @IsNotEmpty()
    @IsString()
    name: string;
 
    @ApiProperty({example:456, description:"Category soni"})
    @IsNotEmpty()
    total: number;

 
}
