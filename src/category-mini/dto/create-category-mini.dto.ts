import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryMiniDto {
    @ApiProperty({example:'Best seller', description:"Category nomi"})
    @IsNotEmpty()
    @IsString()
    name: string;
 
    @ApiProperty({example:456, description:"Category soni"})
    @IsNumber()
    @IsNotEmpty()
    total: number;
 
}
