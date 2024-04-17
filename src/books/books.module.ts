import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Books } from './models/book.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';
import { Comment } from '../comment/models/comment.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Books, Comment]),
    JwtModule.register({}),
    FilesModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
