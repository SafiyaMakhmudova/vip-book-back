import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Format, Type } from '../models/book.model';

export class FindBookDto {
  @ApiProperty({ example: 'Educated', description: 'Book`s name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'EBook',
    description: 'Type of book',
  })
  @IsEnum(Type)
  @IsOptional()
  type?: string;

  @ApiProperty({
    example: 'Hard',
    description: 'The cover of the book',
  })
  @IsEnum(Format)
  @IsOptional()
  format?: string;

  @ApiProperty({
    example: 'Tara Westover',
    description: "book's author",
  })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({
    example: '25.000.000',
    description: 'Start price',
  })
  @IsString()
  @IsOptional()
  start_price?: number;

  @ApiProperty({
    example: '65.000.000',
    description: 'End price',
  })
  @IsString()
  @IsOptional()
  end_pirce?: number;

  @ApiProperty({
    example: '30',
    description: 'Start quantity',
  })
  @IsNumber()
  @IsOptional()
  start_quantity?: number;

  @ApiProperty({
    example: '60',
    description: 'End quantity',
  })
  @IsNumber()
  @IsOptional()
  end_quantity?: number;

  @ApiProperty({
    example: 'Best seller',
    description: 'Category name',
  })
  @IsString()
  @IsOptional()
  category?:string;
}
