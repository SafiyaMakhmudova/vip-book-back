import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Books } from './models/book.model';
import { FilesService } from '../files/files.service';
import { v4 } from 'uuid';
import { Op, } from 'sequelize';
import { FindBookDto } from './dto/find-book.dto';
import { Comment } from '../comment/models/comment.model';
import { CategoryMax } from '../category-max/models/category-max.model';
import { CategoryMini } from '../category-mini/models/category-mini.model';
import { Sequelize } from 'sequelize-typescript';
import sequelize from 'sequelize';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books) private bookRepo: typeof Books,
    @InjectModel(Comment) // Comments modelni inject qilish
    private commentRepo: typeof Comment,
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

  async findAllBooks(limit: number, skip: number): Promise<object> {
    const offset = (skip - 1) * limit;
    
    const { count, rows: books } = await this.bookRepo.findAndCountAll({
      order: [['createdAt', 'DESC']],
      where: { status: 'Book' },
      include: { all: true },
      limit,
      offset
    });
    const total = await this.bookRepo.findAll({where:{status:'Book'}})
    
  
    if (count === 0) {
      return {
        message: 'Books Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    }
  
    if (books.length === 0) {
      return {
        message: 'Books Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    }
  
    return {
      status: HttpStatus.OK,
      limit_books: books,
      total: total.length,
    };
  }

  async findAll(limit: number, skip: number): Promise<object> {
    const offset = (skip - 1) * limit;
    
    const { count, rows: books } = await this.bookRepo.findAndCountAll({
      order: [['createdAt', 'DESC']],
      include: { all: true },
      limit,
      offset
    });
    const total = await this.bookRepo.findAll()
  
    if (count === 0) {
      return {
        message: 'Books Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    }
  
    if (books.length === 0) {
      return {
        message: 'Books Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      status: HttpStatus.OK,
      limit_books: books,
      total: total.length,
    };
  }

  async findAllCanst(limit: number, skip: number): Promise<object> {
    const offset = (skip - 1) * limit;
    
    const { count, rows: books } = await this.bookRepo.findAndCountAll({
      order: [['createdAt', 'DESC']],
      where: { status: 'Canstavar' },
      include: { all: true },
      limit,
      offset
    });
    
    if (count === 0) {
      return {
        message: 'Books Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    }
  
    if (books.length === 0) {
      return {
        message: 'Books Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    }
  
    return {
      status: HttpStatus.OK,
      limit_books: books,
      total: count,
    };
  }

  async top_rated(): Promise<Books[]> {
    return await this.bookRepo.findAll({
      include: [{ model: this.commentRepo, as: 'comments' }], // Comments modelni ham yuklab olish
      order: [[{ model: this.commentRepo, as: 'comments' }, 'rating', 'DESC']], // comments.rating bo'yicha sort qilish
      where: { status: 'Book' }, // statusi 'Book' bo'lgan kitoblarni filter qilish
    });
  
    
  }

  async sold_rated(): Promise<any> {
    const sortedBooks = await this.bookRepo.findAll({
      include: [{ all: true }],
      order: [['sold_rating', 'DESC']],
    });

    if (!sortedBooks) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return sortedBooks;
  }

  async searchBook(findBookDto: FindBookDto) {
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

    if (findBookDto.start_price && findBookDto.end_price ) {
      where['price'] = {
        [Op.between]: [findBookDto.start_price, findBookDto.end_price],
      };
    } else if (findBookDto.start_price) {
      where['price'] = { [Op.gte]: findBookDto.start_price };
    } else if (findBookDto.end_price) {
      where['price'] = { [Op.lte]: findBookDto.end_price };
    }

    if (findBookDto.start_quantity && findBookDto.end_quantity) {
      where['total_count'] = {
        [Op.between]: [findBookDto.start_quantity, findBookDto.end_quantity],
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

    const statusBooks = book.filter((item) => item.status === 'Book');

    if (statusBooks.length === 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return {
      books:statusBooks,
      status:200
    };
  }


  async searchCanst(findBookDto: FindBookDto) {
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
  
    if (findBookDto.start_price && findBookDto.end_price) {
      where['price'] = {
        [Op.between]: [findBookDto.start_price, findBookDto.end_price],
      };
    } else if (findBookDto.start_price) {
      where['price'] = { [Op.gte]: findBookDto.start_price };
    } else if (findBookDto.end_price) {
      where['price'] = { [Op.lte]: findBookDto.end_price };
    }
  
    if (findBookDto.start_quantity && findBookDto.end_quantity) {
      where['total_count'] = {
        [Op.between]: [findBookDto.start_quantity, findBookDto.end_quantity],
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
  
    const statusBooks = book.filter((item) => item.status === 'Canstavar');
  
    if (statusBooks.length === 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  
    return statusBooks;
  }

  async findOne(id: number): Promise<any> {
    const booksWithTrueComments = await this.bookRepo.findOne({
      where: { id },
      include: [
        {all:true
          // model: Comment,
          // where: { status: 'true' },
        },
      ],
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

  async search(name: string, limit: number, skip: number) {
    const where = {};
    
    if (name) {
      where['$category_Mini.name$'] = {
        [Op.like]: `%${name}%`,
      };
    }

    const book = await this.bookRepo.findAll({
      where,
      include: [{all:true}],
      order: [['sold_rating', 'DESC']],
    });

    if (book.length === 0) {
      return {
        message: 'Category Not Found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    let limit_books = [];
    if (skip === 1 || skip < 1) {
      let num = 0;
      for (let index = num; index < num + limit; index++) {
        if (book[index] === undefined) break;

        limit_books.push(book[index]);
      }
    } else {
      let num = (skip - 1) * limit;
      for (let index = num; index < num + limit; index++) {
        if (book[index] === undefined) break;

        limit_books.push(book[index]);
      }
    }

    if (limit_books.length === 0)
      return {
        message: 'Category Not Found',
        status: HttpStatus.NOT_FOUND,
      };

    const total = book.length;

    return {
      status: HttpStatus.OK,
      limit_books,
      total,
    };
  }


  async updateImage(id: number, image: any) {
    const removeFile = await this.removeFile(id);

    if (!removeFile) {
      throw new BadRequestException("Don't remove image");
    }

    const createFile = await this.fileService.createFile(image);
    const updateFile = await this.bookRepo.update(
      {
        image: createFile,
      },
      { where: { id }, returning: true },
    );
    return updateFile;
  }

}
