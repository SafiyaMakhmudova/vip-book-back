import { Module } from '@nestjs/common';
import { CategoryMiniService } from './category-mini.service';
import { CategoryMiniController } from './category-mini.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryMini } from './models/category-mini.model';
import { JwtModule } from '@nestjs/jwt';
import { Books } from '../books/models/book.model';
@Module({
  
  imports:[SequelizeModule.forFeature([CategoryMini, Books]),
  JwtModule.register({}),
  ],
  controllers: [CategoryMiniController],
  providers: [CategoryMiniService],
})
export class CategoryMiniModule {}
