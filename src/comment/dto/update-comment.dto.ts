import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto  {
    @ApiProperty({ example: 'good', description: 'Comment text' })
    @IsString()
    @IsOptional()
    text?: string;
  
}
