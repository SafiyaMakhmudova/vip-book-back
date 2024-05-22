import { Module } from '@nestjs/common';
import { OrderItemService } from './order_item.service';
import { OrderItemController } from './order_item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItem } from './models/order_item.model';
import { Order } from '../order/models/order.model';
import { CartItem } from '../cart_item/models/cart_item.model';
import { JwtModule } from '@nestjs/jwt';
import { TelegramBotService } from '../telegram-bot.service';
import { Cart } from '../cart/models/cart.model';

@Module({
  imports: [
    SequelizeModule.forFeature([OrderItem, Order, CartItem, Cart]),
    JwtModule.register({}),
  ],
  controllers: [OrderItemController],
  providers: [OrderItemService, TelegramBotService],
})
export class OrderItemModule {}
