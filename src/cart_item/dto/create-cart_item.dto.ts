import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty({
    example: 6,
    description: 'User id',
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
