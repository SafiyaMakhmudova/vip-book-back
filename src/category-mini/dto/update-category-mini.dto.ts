import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryMiniDto } from './create-category-mini.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryMiniDto extends PartialType(CreateCategoryMiniDto) {
    @ApiProperty({example:'Best seller', description:"Category nomi"})
    @IsOptional()
    @IsString()
    name?: string;
 
    @ApiProperty({example:456, description:"Category soni"})
    @IsNumber()
    @IsOptional()
    total?: number;
 
}
