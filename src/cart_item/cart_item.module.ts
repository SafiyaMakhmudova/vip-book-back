import { Module } from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from './models/cart_item.model';
import { JwtModule } from '@nestjs/jwt';
import { Cart } from '../cart/models/cart.model';
import { Books } from '../books/models/book.model';
import { OrderItem } from '../order_item/models/order_item.model';

@Module({
  imports: [
    SequelizeModule.forFeature([CartItem, Cart, Books, OrderItem]),
    JwtModule.register({}),
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
