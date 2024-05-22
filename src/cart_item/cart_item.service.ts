import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './models/cart_item.model';
import { Books } from '../books/models/book.model';
import { Cart } from '../cart/models/cart.model';

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem) private cartItemRepo: typeof CartItem,
    @InjectModel(Books) private bookRepo: typeof Books,
    @InjectModel(Cart) private cartRepo: typeof Cart,
  ) {}

  async create(createCartItemDto: CreateCartItemDto) {
    const cart = await this.cartRepo.findAll({
      where: { user_id: createCartItemDto.user_id },
    });

    const totalPrice = cart.reduce((total, item) => {
      return total + item.count * parseFloat(item.price);
    }, 0);
    const bookIds = cart.map((item) => item.book_id);

    return await this.cartItemRepo.create({
      ...createCartItemDto,
      cart_id: bookIds,
      price: BigInt(totalPrice),
    });
  }
  async findAll() {
    return await this.cartItemRepo.findAll();
  }

  async findOne(id: number) {
    const cartItem = await this.cartItemRepo.findOne({
      where: { user_id: id },
      include: { all: true },
    });

    const cart = await this.cartRepo.findAll({
      where: {
        id: cartItem.cart_id,
      },
      include: { all: true },
    });

    return {
      User: cartItem,
      books: cart,
    };
  }

  async remove(id: number) {
    return await this.cartItemRepo.destroy({ where: { id } });
  }
}
