import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { CartItem } from '../../cart_item/models/cart_item.model';
import { Order } from '../../order/models/order.model';

interface OrderItemAttrs {
  cart_item_id: number;
  user_id: number;
  order_id: number;
  date: Date;
  total_price: bigint;
  payment_type: string;
}

@Table({ tableName: 'Order_Item' })
export class OrderItem extends Model<OrderItem, OrderItemAttrs> {
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

  @ForeignKey(() => CartItem)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  cart_item_id: number;

  @BelongsTo(() => CartItem)
  cart_items: CartItem;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  order_id: number;

  @BelongsTo(() => Order)
  orders: Order;

  @ApiProperty({
    example: '2023-09-08',
    description: 'Date',
  })
  @Column({
    type: DataType.DATE,
  })
  date: Date;

  @ApiProperty({
    example: 34000,
    description: 'Productlar narhi',
  })
  @Column({
    type: DataType.BIGINT,
  })
  total_price: number;

  @ApiProperty({
    example: 'click',
    description: "To'lov turi",
  })
  @Column({
    type: DataType.STRING,
  })
  payment_type: string;
}
