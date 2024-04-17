import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { CategoryMax } from '../../category-max/models/category-max.model';
import { CategoryMini } from '../../category-mini/models/category-mini.model';
import { Comment } from '../../comment/models/comment.model';

export enum Format {
  HARD = 'Hard',
  SOFT = 'Soft',
}

export enum Type {
  BOOK = 'Book',
  EBOOK = 'EBook',
  AUDIOBOOK = 'AudioBook',
}


export enum Status {
  BOOK = 'Book',
  CANSTAVAR = 'Canstavar',
}


interface BookAttrs {
  product_id: string;
  image: string;
  name: string;
  author: string;
  price: string;
  publisher: string;
  availibility: string;
  information: string;
  total_count: number;
  sold_rating:number;
  format: Format;
  type: Type;
  new_price:string;
  status:Status;
  max_category_id:number;
  mini_category_id:number;

}

@Table({ tableName: 'Books' })
export class Books extends Model<Books, BookAttrs> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'B2345g', description: 'Qr_code' })
  @Column({
    type: DataType.STRING,
    unique:true
    
  })
  product_id: string;


  @ApiProperty({ example: 'Educated', description: 'Book`s name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'This is big book',
    description: 'Book`s description',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  information: string;

  @ApiProperty({
    example: '25.000.000',
    description: 'Book`s price',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: string;

  @ApiProperty({
    example: '25.000.000',
    description: 'Book`s new price',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  new_price: string;


  @ApiProperty({
    example: '30',
    description: 'Amount books',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_count: number;

  @ApiProperty({
    example: 'img.png',
    description: 'Book image',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @ApiProperty({
    example: 'Tara Westover',
    description: "book's author",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;


  @ApiProperty({
    example: 'availibility',
    description: 'Book`s availibility',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  availibility: string;

  @ApiProperty({
    example: 'Hilol',
    description: 'Book`s publisher',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  publisher: string;


  @ApiProperty({
    example: 23,
    description: 'How many books have been sold',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  sold_rating: number;


  @ApiProperty({
    example: 'Hard',
    description: 'The cover of the book',
  })
  @Column({
    type: DataType.ENUM,
    values: ['Hard', 'Soft'],
    allowNull: false,
  })
  format: Format;

  @ApiProperty({
    example: 'Canstavar',
    description: 'The status of book',
  })
  @Column({
    type: DataType.ENUM,
    values: ['Book', 'Canstavar'],
    allowNull: false,
  })
  status: Status;

  

  @ApiProperty({
    example: 'EBook',
    description: 'Type of book',
  })
  @Column({
    type: DataType.ENUM,
    values: ['Book', 'EBook', 'AudioBook'],
    allowNull: false,
  })
  type: Type;


  @ForeignKey(() => CategoryMax)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  max_category_id: number;

  @BelongsTo(() => CategoryMax)
  category_Max: CategoryMax;

  @ForeignKey(() => CategoryMini)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  mini_category_id: number;

  @BelongsTo(() => CategoryMini)
  category_Mini: CategoryMini;

  
  @HasMany(() => Comment)
  comments: Comment[]

}
