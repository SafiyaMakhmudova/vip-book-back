import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCartDto {
  @ApiProperty({
    example: 34,
    description: 'Product id',
  })
  @IsNumber()
  @IsOptional()
  book_id?: number;

  @ApiProperty({
    example: 34,
    description: 'Product soni',
  })
  @IsNumber()
  @IsOptional()
  count?: number;

  @ApiProperty({
    example: "plus",
    description: "Product cartda soni ko'payish yoki kamayish",
  })
  @IsString()  
  @IsOptional()
  status?: string;

}
