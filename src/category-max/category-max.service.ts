import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryMaxDto } from './dto/create-category-max.dto';
import { UpdateCategoryMaxDto } from './dto/update-category-max.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryMax } from './models/category-max.model';
import { FilesService } from '../files/files.service';
import { Op } from 'sequelize';

@Injectable()
export class CategoryMaxService {
  constructor(
    @InjectModel(CategoryMax) private categoryMaxRepo: typeof CategoryMax,
    private readonly fileService: FilesService,
  ) {}

  async create(
    createCategoryMaxDto: CreateCategoryMaxDto,
    image: any,
  ): Promise<CategoryMax> {
    const fileName = await this.fileService.createFile(image);
    const category = await this.categoryMaxRepo.create({
      ...createCategoryMaxDto,
      img: fileName,
    });
    return category;
  }

  async findAllBookCateMax(limit: number, skip: number): Promise<Object> {
    const cateMaxs = await this.categoryMaxRepo.findAll({
      order: [['createdAt', 'DESC']],
      where: {status: 'Book'},
      include: {all:true}
    });

    if (cateMaxs.length === 0) {
      return {
        message: 'Category Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    let limit_cateMaxs = [];
    if (skip === 1 || skip < 1) {
      let num = 0;
      for (let index = num; index < num + limit; index++) {
        if (cateMaxs[index] === undefined) break;

        limit_cateMaxs.push(cateMaxs[index]);
      }
    } else {
      let num = (skip - 1) * limit;
      for (let index = num; index < num + limit; index++) {
        if (cateMaxs[index] === undefined) break;

        limit_cateMaxs.push(cateMaxs[index]);
      }
    }

    if (limit_cateMaxs.length === 0)
      return {
        message: 'Category Not Found',
        status: HttpStatus.NOT_FOUND,
      };

    const total = cateMaxs.length;

    return {
      status: HttpStatus.OK,
      limit_cateMaxs,
      total,
    };
  }

  async findAllCanstaCateMax(limit: number, skip: number): Promise<Object> {
    const cateMaxs = await this.categoryMaxRepo.findAll({
      order: [['createdAt', 'DESC']],
      where: {status: 'Canstavar'},
      include: {all:true}
    });

    if (cateMaxs.length === 0) {
      return {
        message: 'Category Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    let limit_cateMaxs = [];
    if (skip === 1 || skip < 1) {
      let num = 0;
      for (let index = num; index < num + limit; index++) {
        if (cateMaxs[index] === undefined) break;

        limit_cateMaxs.push(cateMaxs[index]);
      }
    } else {
      let num = (skip - 1) * limit;
      for (let index = num; index < num + limit; index++) {
        if (cateMaxs[index] === undefined) break;

        limit_cateMaxs.push(cateMaxs[index]);
      }
    }

    if (limit_cateMaxs.length === 0)
      return {
        message: 'Category Not Found',
        status: HttpStatus.NOT_FOUND,
      };

    const total = cateMaxs.length;

    return {
      status: HttpStatus.OK,
      limit_cateMaxs,
      total,
    };
  }

  async findAll(limit: number, skip: number): Promise<object> {
    const offset = (skip - 1) * limit;
    
    const { count, rows: categories } = await this.categoryMaxRepo.findAndCountAll({
      order: [['createdAt', 'DESC']],
      include: { all: true },
      limit,
      offset
    });
    const total = await this.categoryMaxRepo.findAll()
  
    if (count === 0) {
      return {
        message: 'Category Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    }
  
    if (categories.length === 0) {
      return {
        message: 'Category Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      status: HttpStatus.OK,
      category: categories,
      total: total.length,
    };
  }

  async findById(id: number): Promise<CategoryMax> {
    const category = await this.categoryMaxRepo.findOne({
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
    updateCategoryMaxDto: UpdateCategoryMaxDto,
  ): Promise<any> {
    const categoryMax = await this.categoryMaxRepo.update(
      updateCategoryMaxDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (!categoryMax[1][0]) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const category = await this.categoryMaxRepo.findOne({
      where: { id },
      include: { all: true },
    });

    if (category.discount) {
      category.book.forEach((book) => {
        const price = parseFloat(book.price);
        const discount = (price * category.discount) / 100;
        const newPrice = price - discount;

        book.new_price = newPrice.toString();
      });

      // const newCategoryMax = await this.categoryMaxRepo.create(category);

      return category;
    }

    return category;
  }

  async remove(id: number): Promise<number> {
    await this.removeFile(id);
    const categoryMax = await this.categoryMaxRepo.destroy({ where: { id } });
    return categoryMax;
  }

  async removeFile(id: number) {
    const category = await this.categoryMaxRepo.findOne({ where: { id } });

    if (!category) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.fileService.removeFile(category.img);
  }

  async updateImage(id: number, image: any) {
    const removeFile = await this.removeFile(id);

    if (!removeFile) {
      throw new BadRequestException("Don't remove image");
    }

    const createFile = await this.fileService.createFile(image);
    const updateFile = await this.categoryMaxRepo.update(
      {
        img: createFile,
      },
      { where: { id }, returning: true },
    );
    return updateFile;
  }

  async search(name: string) {
    const where = {};

    if (name) {
      where['name'] = {
        [Op.like]: `%${name}%`,
      };
    }
    const category = await this.categoryMaxRepo.findAll({
      where,
      order: [['createdAt', 'ASC']],
    });
    if (!category || category.length == 0) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }
}
