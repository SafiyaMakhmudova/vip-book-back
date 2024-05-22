import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';
import { Books } from '../books/models/book.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private cartRepo: typeof Cart,
    @InjectModel(Books) private bookRepo: typeof Books,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    return await this.cartRepo.create(createCartDto);
  }

  async findAll(): Promise<Cart[]> {
    return await this.cartRepo.findAll({include:{all:true}});
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepo.findOne({ where: { id } });
    const books = await this.bookRepo.findOne({
      where: { id: updateCartDto.book_id },
    });
    if (updateCartDto.status === 'plus') {
      if (books.total_count >= cart.count + 1) {
        return await this.cartRepo.update(
          { count: cart.count + 1 }, // Correctly increment the count
          { where: { id }, returning: true }, // Add the missing comma and place where and returning in an options object
        );
      } else {
        throw new BadRequestException('The number of products is limited');
      }
    } else {
      if (cart.count - 1 > 0) {
        return await this.cartRepo.update(
          { count: cart.count - 1 }, // Correctly increment the count
          { where: { id }, returning: true }, // Add the missing comma and place where and returning in an options object
        );
      } else {
        throw new BadRequestException('The number of products is limited');
      }
    }
  }

  async remove(id: number): Promise<number> {
    return await this.cartRepo.destroy({ where: { id } });
 
  }
}
