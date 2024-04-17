import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpCode, HttpStatus, Query, UploadedFile } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Books } from './models/book.model';
import { FindBookDto } from './dto/find-book.dto';


@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'create book' })
  @ApiResponse({ status: 201, type: [Books] })
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createBookDto: CreateBookDto, @UploadedFile() image:any) {
    return this.booksService.create(createBookDto, image);
  }

  @ApiOperation({ summary: 'Search product' })
  @Get('/search')
  search(@Body() findBookDto:FindBookDto) {
    return this.booksService.search(findBookDto);
  }


  @ApiOperation({ summary: 'Get books' })
  @ApiResponse({ status: 200, type: [Books] })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll(@Query('limit') limit: number, @Query('skip') skip: number) {
    return this.booksService.findAll(limit, skip);
  }

  
  @ApiOperation({ summary: 'find one book by id' })
  @ApiResponse({ status: 200, type: [Books] })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @ApiOperation({ summary: 'update by id' })
  @ApiResponse({ status: 202, type: [Books] })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  
  @ApiOperation({ summary: 'delete by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
