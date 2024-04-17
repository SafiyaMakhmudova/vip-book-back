import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class SelectDto {
    @ApiProperty({ example: 1, description: 'page'})
    @IsNumber()
    @IsNotEmpty()
    sort?: number;

    @ApiProperty({ example: 10, description: 'limit'})
    @IsNumber()
    @IsNotEmpty()
    limit?: number;
}