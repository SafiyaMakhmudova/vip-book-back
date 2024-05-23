import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { Books } from '../../books/models/book.model';

interface CartAttrs {
  product_id: number;
  user_id: number;
  count: number;
  price: string;
  status: boolean;
}

@Table({ tableName: 'Cart' })
export class Cart extends Model<Cart, CartAttrs> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user_id: number;

  @BelongsTo(() => User)
  users: User;

  @ForeignKey(() => Books)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  book_id: number;

  @BelongsTo(() => Books)
  books: Books;

  @ApiProperty({
    example: 34,
    description: 'Product soni',
  })
  @Column({
    type: DataType.INTEGER,
  })
  count: number;

  @ApiProperty({
    example: '25000',
    description: 'Product narxi',
  })
  @Column({
    type: DataType.STRING,
  })
  price: string;

  @ApiProperty({
    example: true,
    description: 'Product Sotvolingan yoki yoqligi',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  status: boolean;
}
