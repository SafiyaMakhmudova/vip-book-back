import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Books } from './models/book.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';
import { Comment } from '../comment/models/comment.model';
import { Cart } from '../cart/models/cart.model';
import { CartItem } from '../cart_item/models/cart_item.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Books, Comment, Cart, CartItem]),
    JwtModule.register({}),
    FilesModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
