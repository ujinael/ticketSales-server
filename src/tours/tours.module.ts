import { JwtStrategy } from './../auth/jwt-strategy/jwt-strategy';
import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { Tour, TourSchema } from './entities/tour.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [ToursController],
  providers: [ToursService, JwtStrategy],
  exports: [ToursService],
})
export class ToursModule {}
