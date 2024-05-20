import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryMiniDto } from './dto/create-category-mini.dto';
import { UpdateCategoryMiniDto } from './dto/update-category-mini.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryMini } from './models/category-mini.model';
import { Op } from 'sequelize';
import { Books } from '../books/models/book.model';

@Injectable()
export class CategoryMiniService {
  constructor(
    @InjectModel(CategoryMini) private categoryRepo: typeof CategoryMini,
    @InjectModel(Books) private bookRepo: typeof Books,
  ) {}

  async create(createCategoryMiniDto: CreateCategoryMiniDto) {
    const category = await this.categoryRepo.create(createCategoryMiniDto);
    return category;
  }

  findAll(): Promise<CategoryMini[]> {
    return this.categoryRepo.findAll({ include: { all: true } });
  }

  
  async findOne(id: number): Promise<CategoryMini> {
    const category = await this.categoryRepo.findOne({
      include: { all: true },
      where: { id },
    });
    if (!category) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryMiniDto: UpdateCategoryMiniDto,
  ): Promise<CategoryMini> {
    const category = await this.categoryRepo.update(updateCategoryMiniDto, {
      where: { id },
      returning: true,
    });

    return category[1][0];
  }

  async remove(id: number): Promise<number> {
    const category = await this.categoryRepo.destroy({ where: { id } });

    if (!category) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }
}
