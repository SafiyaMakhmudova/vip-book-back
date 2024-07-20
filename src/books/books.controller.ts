import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Query,
  UploadedFile,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Books } from './models/book.model';
import { FindBookDto } from './dto/find-book.dto';
import { SuperAdminGuard } from '../guards/superAdmin.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'create book' })
  @ApiResponse({ status: 201, type: [Books] })
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminGuard)
  @Post('create')
  create(@Body() createBookDto: CreateBookDto, @UploadedFile() image: any) {
    return this.booksService.create(createBookDto, image);
  }

  @ApiOperation({ summary: 'Search product' })
  @Post('search/book')
  searchBook(@Body() findBookDto: FindBookDto) {
    return this.booksService.searchBook(findBookDto);
  }

  @ApiOperation({ summary: 'Search product' })
  @Get('search/canstavar')
  searchCans(@Body() findBookDto: FindBookDto) {
    return this.booksService.searchCanst(findBookDto);
  }

  @ApiOperation({ summary: 'Get books' })
  @ApiResponse({ status: 200, type: [Books] })
  @HttpCode(HttpStatus.OK)
  @Get('all/book')
  findAllBook(@Query('limit') limit: number, @Query('skip') skip: number) {
    return this.booksService.findAllBooks(limit, skip);
  }

  @ApiOperation({ summary: 'Get All products' })
  @ApiResponse({ status: 200, type: [Books] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Get('all')
  findAll(@Query('limit') limit: number, @Query('skip') skip: number) {
    return this.booksService.findAll(limit, skip);
  }

  @ApiOperation({ summary: 'Get books' })
  @ApiResponse({ status: 200, type: [Books] })
  @HttpCode(HttpStatus.OK)
  @Get('all/canstavar')
  findAllCans(@Query('limit') limit: number, @Query('skip') skip: number) {
    return this.booksService.findAllCanst(limit, skip);
  }

  @ApiOperation({ summary: 'Top rated' })
  @ApiResponse({ status: 200, type: [Books] })
  @HttpCode(HttpStatus.OK)
  @Get('topRated')
  TopRated() {
    return this.booksService.top_rated();
  }

  @ApiOperation({ summary: 'Sold rating' })
  @ApiResponse({ status: 200, type: [Books] })
  @HttpCode(HttpStatus.OK)
  @Get('soldRated')
  SoldRated() {
    return this.booksService.sold_rated();
  }

  @ApiOperation({ summary: 'Search Category name' })
  @ApiResponse({ status: 200, type: [Books] })
  @HttpCode(HttpStatus.OK)
  @Get('search')
  findAllSearch(
    @Query('name') name: string,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ) {
    return this.booksService.search(name, limit, skip);
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
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @ApiOperation({ summary: 'delete by id' })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }

    
  @ApiOperation({ summary: 'Image by id update ' })
  @ApiResponse({ status: 202, description: 'update by id image', type: [Books] })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @Patch('file/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateFile(@Param('id') id: string, @UploadedFile() image: any) {
    return this.booksService.updateImage(+id, image);
  }

}
