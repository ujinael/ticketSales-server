import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrders(@Req() req: any): Promise<Order[]> {
    const token = req.get('Authorization').replace('Bearer', '').trim();
    const userId = this.ordersService.getUserIdFromJwt(token);
    return this.ordersService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addOrder(@Body() createOrderDto: CreateOrderDto): void {
    this.ordersService.create(createOrderDto);
  }
}
