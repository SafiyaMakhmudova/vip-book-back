import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { JwtModule } from '@nestjs/jwt';
import { OrderItem } from '../order_item/models/order_item.model';

@Module({
  imports:[SequelizeModule.forFeature([Order, OrderItem]), JwtModule.register({})],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
