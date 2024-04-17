import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class CreateCommentDto {
    
    @ApiProperty({ example: 4, description: 'rating' })
    @IsNumber()
    rating: number;
  
  
    @ApiProperty({ example: 'good', description: 'Comment text' })
    @IsString()
    text: string;
  
    @ApiProperty({ example: 3, description: 'Book id' })
    book_id: number;
  
    @ApiProperty({ example: 1, description: 'User' })
    user_id: number;
  
}
