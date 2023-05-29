import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { Order, OrderSchema } from './entities/order.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, JwtService],
})
export class OrdersModule {}
