import { Module } from '@nestjs/common';
import { CategoryMaxService } from './category-max.service';
import { CategoryMaxController } from './category-max.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryMax } from './models/category-max.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';

@Module({
  imports:[SequelizeModule.forFeature([CategoryMax]), JwtModule.register({}), FilesModule],
  controllers: [CategoryMaxController],
  providers: [CategoryMaxService],
})
export class CategoryMaxModule {}