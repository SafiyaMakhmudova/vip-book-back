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
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { CategoryMaxService } from './category-max.service';
import { CreateCategoryMaxDto } from './dto/create-category-max.dto';
import { UpdateCategoryMaxDto } from './dto/update-category-max.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryMax } from './models/category-max.model';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Categories-max')
@Controller('category-max')
export class CategoryMaxController {
  constructor(private readonly categoryMaxService: CategoryMaxService) {}

  @ApiOperation({ summary: 'create category' })
  @ApiResponse({ status: 201, type: [CategoryMax] })
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(
    @Body() createCategoryMaxDto: CreateCategoryMaxDto,
    @UploadedFile() image: any,
  ) {
    return this.categoryMaxService.create(createCategoryMaxDto, image);
  }

  @ApiOperation({ summary: 'Get categories' })
  @ApiResponse({ status: 200, type: [CategoryMax] })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll(@Query('limit') limit: number, @Query('skip') skip: number) {
    return this.categoryMaxService.findAllCateMax(limit, skip);
  }


  @ApiOperation({ summary: 'Search Category' })
  @ApiResponse({ status: 200, type: [CategoryMax] })
  @HttpCode(HttpStatus.OK)
  @Get('search')
  findAllSearch(
    @Query('name') name: string
    ) {
    return this.categoryMaxService.search(name);
  }



  @ApiOperation({ summary: 'find one category by id' })
  @ApiResponse({ status: 200, type: [CategoryMax] })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryMaxService.findById(+id);
  }

  
  @ApiOperation({ summary: 'Image by id update ' })
  @ApiResponse({ status: 202, description: 'update by id image', type: [CategoryMax] })
  @HttpCode(HttpStatus.OK)
  @Patch('file/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateFile(@Param('id') id: string, @UploadedFile() image: any) {
    return this.categoryMaxService.updateImage(+id, image);
  }


  @ApiOperation({ summary: 'update by id' })
  @ApiResponse({ status: 202, type: [CategoryMax] })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryMaxDto: UpdateCategoryMaxDto,
  ) {
    return this.categoryMaxService.update(+id, updateCategoryMaxDto);
  }

  @ApiOperation({ summary: 'delete by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryMaxService.remove(+id);
  }
}
