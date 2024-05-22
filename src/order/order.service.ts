import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepo: typeof Order) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepo.create({...createOrderDto, date:new Date()});
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepo.findAll({ include: { all: true } });
  }

  async remove(id: number): Promise<Number> {
    return await this.orderRepo.destroy({ where: { id } });
  }
}
