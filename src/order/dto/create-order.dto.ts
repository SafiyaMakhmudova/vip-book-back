import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({
        example: 'Toshkent',
        description: 'Userga yetkazib berish shahri',
      })
      @IsString()
      @IsNotEmpty()
      city: string;
    
      @ApiProperty({
        example: 'Abdulla Qodiriy',
        description: "yetkazib berish ko'chasi",
      })
      @IsString()
      @IsNotEmpty()
      district: string;
    
      @ApiProperty({
        example: '13-uy',
        description: 'Yetkazib berish uyi',
      })
      @IsString()
      @IsNotEmpty()
      home: string;
    
      @ApiProperty({
        example: '36-xonadon',
        description: 'Yetkazib berish xonadoni',
      })
      @IsString()
      @IsNotEmpty()
      appartment: string;
    
    
      @ApiProperty({
        example: '1',
        description: 'Userning idsi',
      })
      @IsNumber()
      @IsNotEmpty()
      user_id: number;
    
}
