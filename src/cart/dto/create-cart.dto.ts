import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({
    example: 3,
    description: 'User id',
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    example: 34,
    description: 'Product id',
  })  
  @IsNumber()
  @IsNotEmpty()
  book_id: number;

  @ApiProperty({
    example: 34,
    description: 'Product soni',
  })
  @IsNumber()
  @IsNotEmpty()
  count: number;
  
  
  @ApiProperty({
    example: '25000',
    description: 'Product narxi',
  })
  @IsString()
  @IsNotEmpty()
  price: string;

}
