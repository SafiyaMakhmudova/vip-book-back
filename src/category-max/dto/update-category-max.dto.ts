import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryMaxDto } from './create-category-max.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Discount } from '../models/category-max.model';

export class UpdateCategoryMaxDto extends PartialType(CreateCategoryMaxDto) {
    @ApiProperty({example:'Best seller', description:"Category nomi"})
    @IsOptional()
    @IsString()
    name?: string;
 
    @ApiProperty({example:456, description:"Category soni"})
    @IsNumber()
    @IsOptional()
    total?: number;

    @ApiProperty({
        example: 20,
        description: 'Discount percentage',
      })
      @IsEnum(Discount)
      @IsOptional()
      discount?: Discount;
    
    

}
