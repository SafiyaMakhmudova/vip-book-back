import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({
    example: 6,
    description: 'User id',
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    example: 2,
    description: 'Cart Item id',
  })
  @IsNumber()
  @IsNotEmpty()
  cart_item_id: number;

  @ApiProperty({
    example: 1,
    description: 'Order id',
  })
  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty({
    example: 'click',
    description: "To'lov turi",
  })
  @IsString()
  @IsNotEmpty()
  payment_type: string;
}
