import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { ApiProperty } from '@nestjs/swagger';
import {IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Format, Status, Type } from '../models/book.model';

export class UpdateBookDto  {
  
    @ApiProperty({ example: 'Educated', description: 'Book`s name' })
    @IsString()
    @IsOptional()
    name?: string;
  
    @ApiProperty({
      example: 'This is big book',
      description: 'Book`s description',
    })
    @IsString()
    @IsOptional()
    information?: string;
  
    @ApiProperty({
      example: '25.000.000',
      description: 'Book`s price',
    })
    @IsString()    
    @IsOptional()
    price?: string;
  
    @ApiProperty({
      example: '30',
      description: 'Amount books',
    })
    @IsNumber()
    @IsOptional()
    total_count?: number;
  
    @ApiProperty({
      example: 'Tara Westover',
      description: "book's author",
    })
    @IsString()
    @IsOptional()
    author?: string;
  
    @ApiProperty({
      example: 'availibility',
      description: 'Book`s availibility',
    })
    @IsString()
    @IsOptional()
    availibility?: string;
  
    @ApiProperty({
      example: 'Hilol',
      description: 'Book`s publisher',
    })
    @IsString()
    @IsOptional()
    publisher?: string;
  
    
  @ApiProperty({
    example: 'Hard',
    description: 'The cover of the book',
  })
  @IsEnum(Format)
  format: Format;

  @ApiProperty({
    example: 'EBook',
    description: 'Type of book',
  })
  @IsEnum(Type)
  type: Type;

  @ApiProperty({
    example: 'Canstavar',
    description: 'The status of book',
  })
  @IsEnum(Status)
  status: Status;


  @ApiProperty({
    example: 3,
    description: 'which category',
  })
  mini_category_id:number;

  
  @ApiProperty({
    example: 4,
    description: 'which category',
  })
  max_category_id:number
  
  
}
