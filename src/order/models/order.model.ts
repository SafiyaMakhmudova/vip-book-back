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
import { OrderItem } from '../../order_item/models/order_item.model';

interface OrderAttrs {
  city: string;
  district: string;
  home: string;
  appartment: string;
  date: Date;
  user_id: number;
}

@Table({ tableName: 'Order' })
export class Order extends Model<Order, OrderAttrs> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Toshkent',
    description: 'Userga yetkazib berish shahri',
  })
  @Column({
    type: DataType.STRING,
  })
  city: string;

  @ApiProperty({
    example: 'Abdulla Qodiriy',
    description: "yetkazib berish ko'chasi",
  })
  @Column({
    type: DataType.STRING,
  })
  district: string;

  @ApiProperty({
    example: '13-uy',
    description: 'Yetkazib berish uyi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  home: string;

  @ApiProperty({
    example: '36-xonadon',
    description: 'Yetkazib berish xonadoni',
  })
  @Column({
    type: DataType.STRING,
  })
  appartment: string;

  @ApiProperty({
    example: '2023-09-08',
    description: 'Buyurtma olgan kun',
  })
  @Column({
    type: DataType.DATE,
  })
  date: Date;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user_id: number;

  @BelongsTo(() => User)
  users: User;

  @HasMany(() => OrderItem)
  order_items: OrderItem[]
}
