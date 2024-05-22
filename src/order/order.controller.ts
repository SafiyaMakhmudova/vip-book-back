import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './models/order.model';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create Order' })
  @ApiResponse({
    status: 201,
    type: Order,
  })
  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'View all Orders' })
  @ApiResponse({
    status: 200,
    description: 'List of Order',
    type: [Order],
  })
  @Get('all')
  findAll() {
    return this.orderService.findAll();
  }


  @ApiOperation({ summary: 'remove by id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
