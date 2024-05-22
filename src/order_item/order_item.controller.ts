import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import { OrderItemService } from './order_item.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderItem } from './models/order_item.model';

@ApiTags('Order-Item')
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}


  @ApiOperation({ summary: 'Create Order-item' })
  @ApiResponse({
    status: 201,
    type: OrderItem,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @ApiOperation({ summary: 'View all OrderItem' })
  @ApiResponse({
    status: 200,
    description: 'List of Cart-item',
    type: [OrderItem],
  })
  @Get('all')
  findAll() {
    return this.orderItemService.findAll();
  }

  @ApiOperation({ summary: 'Find by id' })
  @ApiResponse({
    status: 200,
    type: OrderItem,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }

  @ApiOperation({ summary: 'remove by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(+id);
  }


}
