import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Books } from "../../books/models/book.model";
import { User } from "../../user/models/user.model";


interface CommentAttrs {
    rating:number;
    text:string;
    user_id:number;
    book_id:number;
    status:boolean;
}


@Table({tableName:'comment'})
export class Comment extends Model<Comment, CommentAttrs> {
    @ApiProperty({ example: '1', description: 'Unikal ID' })
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;
  
    @ApiProperty({ example: 4, description: 'rating' })
    @Column({
      type: DataType.INTEGER,
      allowNull:true
      
    })
    rating: number;
  
  
    @ApiProperty({ example: 'good', description: 'Comment text' })
    @Column({
      type: DataType.TEXT,
      allowNull: true,
    })
    text: string;
  
    
    @ApiProperty({ example: true, description: 'Comment status' })
    @Column({
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue:false
    })
    status: boolean;

    @ForeignKey(() => Books)
    @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    book_id: number;
  
    @BelongsTo(() => Books)
    book: Books;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    user_id: number;
  
    @BelongsTo(() => User)
    user: User;
  
}
