import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoryMiniService } from './category-mini.service';
import { CreateCategoryMiniDto } from './dto/create-category-mini.dto';
import { UpdateCategoryMiniDto } from './dto/update-category-mini.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryMini } from './models/category-mini.model';

@ApiTags('Categories-mini')
@Controller('category-mini')
export class CategoryMiniController {
  constructor(private readonly categoryMiniService: CategoryMiniService) {}

  
  @ApiOperation({summary:'create category'})
  @ApiResponse({status:201, type:[CategoryMini]})
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createCategoryMiniDto: CreateCategoryMiniDto) {
    return this.categoryMiniService.create(createCategoryMiniDto);
  }

  
  @ApiOperation({summary:'Get categories'})
  @ApiResponse({status:200, type:[CategoryMini]})
  @Get('all')
  findAll() {
    return this.categoryMiniService.findAll();
  }

  
  @ApiOperation({summary:'find one category by id'})
  @ApiResponse({status:200, type:[CategoryMini]})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryMiniService.findOne(+id);
  }

  
  @ApiOperation({summary:'update by id'})
  @ApiResponse({status:202, type:[CategoryMini]})
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryMiniDto: UpdateCategoryMiniDto,
  ) {
    return this.categoryMiniService.update(+id, updateCategoryMiniDto);
  }

  
  @ApiOperation({summary:'delete by id'})
  @ApiResponse({status:200, type:Number})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryMiniService.remove(+id);
  }
}
