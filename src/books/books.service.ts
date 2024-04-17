import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Books } from './models/book.model';
import { FilesService } from '../files/files.service';
import { v4 } from 'uuid';
import { Op, where } from 'sequelize';
import { FindBookDto } from './dto/find-book.dto';
import { Comment } from '../comment/models/comment.model';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books) private bookRepo: typeof Books,
    private readonly fileService: FilesService,
  ) {}

  async create(createBookDto: CreateBookDto, image: any): Promise<Books> {
    const fileName = await this.fileService.createFile(image);

    createBookDto.product_id = v4();
    const category = await this.bookRepo.create({
      ...createBookDto,
      image: fileName,
    });
    return category;
  }
  s;

  async findAll(limit: number, skip: number): Promise<object> {
    const books = await this.bookRepo.findAll({
      order: [['createdAt', 'DESC']],
      include: { all: true },
    });

    if (books.length === 0) {
      return {
        message: 'Books Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    let limit_books = [];
    if (skip === 1 || skip < 1) {
      let num = 0;
      for (let index = num; index < num + limit; index++) {
        if (books[index] === undefined) break;

        limit_books.push(books[index]);
      }
    } else {
      let num = (skip - 1) * limit;
      for (let index = num; index < num + limit; index++) {
        if (books[index] === undefined) break;

        limit_books.push(books[index]);
      }
    }

    if (limit_books.length === 0)
      return {
        message: 'Books Not Found',
        status: HttpStatus.NOT_FOUND,
      };

    const total = books.length;

    return {
      status: HttpStatus.OK,
      limit_books,
      total,
    };
  }

  async search(findBookDto: FindBookDto) {
    const where = {};

    if (findBookDto.name) {
      where['name'] = {
        [Op.like]: `%${findBookDto.name}%`,
      };
    }
    if (findBookDto.type) {
      where['type'] = {
        [Op.like]: `%${findBookDto.type}%`,
      };
    }
    if (findBookDto.format) {
      where['format'] = {
        [Op.like]: `%${findBookDto.format}%`,
      };
    }
    if (findBookDto.author) {
      where['author'] = {
        [Op.like]: `%${findBookDto.author}%`,
      };
    }

    if (findBookDto.start_price && findBookDto.end_pirce) {
      where[Op.and] = {
        time: {
          [Op.between]: [findBookDto.start_price, findBookDto.end_pirce],
        },
      };
    } else if (findBookDto.start_price) {
      where['price'] = { [Op.gte]: findBookDto.start_price };
    } else if (findBookDto.end_pirce) {
      where['price'] = { [Op.lte]: findBookDto.end_pirce };
    }

    if (findBookDto.start_quantity && findBookDto.end_quantity) {
      where[Op.and] = {
        time: {
          [Op.between]: [findBookDto.start_quantity, findBookDto.end_quantity],
        },
      };
    } else if (findBookDto.start_quantity) {
      where['total_count'] = { [Op.gte]: findBookDto.start_quantity };
    } else if (findBookDto.end_quantity) {
      where['total_count'] = { [Op.lte]: findBookDto.end_quantity };
    }

    const book = await Books.findAll({ where, include: { all: true } });

    let filteredData1;
    let filteredData2;

    if (findBookDto.category) {
      filteredData1 = book.filter(
        (item) =>
          item.category_Mini.name.toLowerCase() ===
          findBookDto.category.toLowerCase(),
      );
      filteredData2 = book.filter(
        (item) =>
          item.category_Max.name.toLowerCase() ===
          findBookDto.category.toLowerCase(),
      );
    }

    if (filteredData1.length == 0 && filteredData2.length == 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } else if (filteredData1.length == 0) {
      return filteredData2;
    } else {
      return filteredData1;
    }
  }

  async findOne(id: number): Promise<any> {

    const booksWithTrueComments = await this.bookRepo.findOne({
      where: { id },
      include: [{
        model: Comment,
        where: { status: 'true' }
      }]
    });
    
    
    if (!booksWithTrueComments) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return booksWithTrueComments;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<any> {
    const book = await this.bookRepo.findOne({
      where: { id },
      include: { all: true },
    });

    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const bookUpdated = await this.bookRepo.update(updateBookDto, {
      where: { id },
      returning: true,
    });

    return bookUpdated[1][0];
  }

  async remove(id: number): Promise<Number> {
    await this.removeFile(id);
    const book = await this.bookRepo.destroy({ where: { id } });
    return book;
  }

  async removeFile(id: number) {
    const book = await this.bookRepo.findOne({ where: { id } });

    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.fileService.removeFile(book.image);
  }
}
