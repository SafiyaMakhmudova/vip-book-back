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
  UseGuards,
} from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartItem } from './models/cart_item.model';
import { selfClientGuard } from '../guards/selfClient.guard';

@ApiTags('Cart-item')
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiOperation({ summary: 'create cart-item' })
  @ApiResponse({ status: 201, type: [CartItem] })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  @ApiOperation({ summary: 'View all Cart-item' })
  @ApiResponse({
    status: 200,
    description: 'List of Cart-item',
    type: [CartItem],
  })
  @Get('all')
  findAll() {
    return this.cartItemService.findAll();
  }

  @ApiOperation({ summary: 'Get by id by user' })
  @ApiResponse({
    status: 200,
    description: 'List of Cart-item',
    type: [CartItem],
  })
  @UseGuards(selfClientGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemService.findOne(+id);
  }

  @ApiOperation({ summary: 'delete by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemService.remove(+id);
  }
}
