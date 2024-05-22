import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';
import { JwtModule } from '@nestjs/jwt';
import { Books } from '../books/models/book.model';
import { CartItem } from '../cart_item/models/cart_item.model';
import { OrderItem } from '../order_item/models/order_item.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart, Books, CartItem, OrderItem]),
    JwtModule.register({}),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
