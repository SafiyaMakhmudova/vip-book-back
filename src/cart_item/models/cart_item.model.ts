import { ApiProperty } from '@nestjs/swagger';
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { OrderItem } from '../../order_item/models/order_item.model';

interface CartItemAttrs {
  cart_id: number[];
  user_id: number;
  price: bigint;
}

@Table({ tableName: 'Cart_item' })
export class CartItem extends Model<CartItem, CartItemAttrs> {
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

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cart_id: number[];

  @ApiProperty({
    example: 34000,
    description: 'Productlar narhi',
  })
  @Column({
    type: DataType.BIGINT,
  })
  price: number;

  @HasMany(() => OrderItem)
  order_items: OrderItem[]
}
