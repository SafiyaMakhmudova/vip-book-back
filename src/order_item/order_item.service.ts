import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { OrderItem } from './models/order_item.model';
import { CartItem } from '../cart_item/models/cart_item.model';
import { TelegramBotService } from '../telegram-bot.service';
import { Cart } from '../cart/models/cart.model';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectModel(OrderItem) private orderItemRepo: typeof OrderItem,
    @InjectModel(Cart) private cartRepo: typeof Cart,
    @InjectModel(CartItem) private cartItemRepo: typeof CartItem,
    private readonly telegramBotService: TelegramBotService,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const cart_item = await this.cartItemRepo.findOne({
      where: { id: createOrderItemDto.cart_item_id },
      include: { all: true },
    });
    console.log("cart_item", cart_item);
    
    if (!cart_item) {
      throw new BadRequestException('Not found');
    }
    const create_order_item = await this.orderItemRepo.create({
      ...createOrderItemDto,
      total_price: BigInt(cart_item.price),
      date: new Date(),
    });

    const order_item = await this.orderItemRepo.findOne({
      where: { id: create_order_item.id },
      include: { all: true },
    });
    console.log("2", order_item);
    
    const cart = await this.cartRepo.findAll({
      where: { book_id: order_item.cart_items.cart_id },
      include: { all: true },
    });

    try {
      await this.cartRepo.update(
        { status: true },
        {
          where: {
            book_id: order_item.cart_items.cart_id,
          },
        },
      );
      console.log('Order statuses updated successfully.');
    } catch (error) {
      console.error('Error updating order statuses:', error);
    }
    console.log("cartt", cart);
    
    let result = cart
      .map((item) => ({
        count: item.count,
        name: item.books.name.trim(),
      }))
      .map((item) => `${item.count}ta kitob nomi: ${item.name}`)
      .join('\n ');
      console.log("------", result);
      
    let day = order_item.date.getDate();
    let month = order_item.date.getMonth();
    let year = order_item.date.getFullYear();

    // Format the message
    const message = `BUYURTMA:\n 
    User ID:${cart_item.user_id}\n 
    User telefon raqami: ${cart_item.users.phone_number}\n 
    YETKAZIB BERISH MANZILI:\n
    Shahar: ${order_item.orders.city}\n
    Ko\'cha: ${order_item.orders.district}\n
    Uy: ${order_item.orders.district}\n
    Xonadon: ${order_item.orders.appartment}\n
    Kitoblar:\n
    ${result}\n
    Jami: ${order_item.total_price} so'm\n
    To\'lov turi: ${order_item.payment_type}\n
    Kuni: ${day}-${month + 1}-${year}`;

    try {
      this.telegramBotService.sendMessage(message);
    } catch (error) {
      console.error(error.message);
      throw new BadRequestException("Server error")
      // Handle the error as needed, maybe notify the user to send a message to the bot
    }
    result = '';
    return 'Success';
  }

  async findAll(): Promise<OrderItem[]> {
    return await this.orderItemRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<OrderItem> {
    return await this.orderItemRepo.findOne({
      where: { user_id: id },
      include: { all: true },
    });
  }

  async remove(id: number) {
    const user = await this.orderItemRepo.findByPk(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await this.orderItemRepo.destroy({ where: { id } });
  }
}
