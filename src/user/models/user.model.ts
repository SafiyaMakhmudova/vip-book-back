import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Comment } from '../../comment/models/comment.model';
import { Order } from '../../order/models/order.model';
import { Cart } from '../../cart/models/cart.model';
import { CartItem } from '../../cart_item/models/cart_item.model';
import { OrderItem } from '../../order_item/models/order_item.model';

interface UserAttrs {
  name: string;
  phone_number: string;
  email: string;
  password: string;
  hashed_refresh_token: string;
}

@Table({ tableName: 'User' })
export class User extends Model<User, UserAttrs> {
  @ApiProperty({ example: '1', description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Ali', description: 'Userning ismi' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Userning telefon raqami',
  })
  @Column({
    type: DataType.STRING,
    allowNull:true
  })
  phone_number: string;

  @ApiProperty({
    example: 'user@mail.uz',
    description: 'Userning emaili',
  })
  @Column({
    type: DataType.STRING,
    allowNull:true
  })
  email: string;

  @ApiProperty({
    example: 'vda7ghd',
    description: 'Userning paroli',
  })
  @Column({
    type: DataType.STRING,
  })
  password: string;


  @ApiProperty({
    example: 'Token',
    description: 'Userning tokeni',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashed_refresh_token: string;

  @ApiProperty({
    example: 'true',
    description: 'User activ yoki activ emasligi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'true',
  })
  is_active: boolean;

  @HasMany(() => Comment)
  comments: Comment[]

  @HasMany(() => Order)
  orders: Order[]

  @HasMany(() => Cart)
  carts: Cart[]

  @HasMany(() => CartItem)
  cart_items: CartItem[]

  
  @HasMany(() => OrderItem)
  order_items: OrderItem[]
}
