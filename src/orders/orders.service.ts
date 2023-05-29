import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Order, OrderDocument } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly jwtService: JwtService,
  ) {}
  getUserIdFromJwt(token: string): string {
    const decodedJwtAccessToken: any = this.jwtService.decode(token);
    return decodedJwtAccessToken._id;
  }
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    console.log(createOrderDto);
    return new this.orderModel(createOrderDto).save();
  }

  async findAll(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId: userId });
  }
}
