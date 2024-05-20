import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Status } from "../models/category-max.model";

export class CreateCategoryMaxDto {
    @ApiProperty({example:'Fiction', description:"Category nomi"})
    @IsNotEmpty()
    @IsString()
    name: string;
 
    @ApiProperty({example:456, description:"Category soni"})
    @IsNotEmpty()
    total: number;

    @ApiProperty({
        example: 'Canstavar',
        description: 'The status of book',
      })
      @IsEnum(Status)
      status: Status;
    
    
}
