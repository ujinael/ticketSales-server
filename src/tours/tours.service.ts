import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tour, TourDocument } from './entities/tour.entity';
import { Model } from 'mongoose';
import { ITour } from './interfaces/tour.interface';
import { UpdateTourDto } from './dto/update-tour.dto';
import { CreateTourDto } from './dto/create-tour.dto';

@Injectable()
export class ToursService {
  toursCount = 10;

  constructor(
    @InjectModel(Tour.name) private readonly tourModel: Model<TourDocument>,
  ) {}

  async generateTours(): Promise<Tour[]> {
    const data: Tour[] = [];
    for (let i = 0; i <= this.toursCount; i++) {
      const img = `${i != 0 && i != 10 ? `pic${i}` : 'ocean'}.jpg`;
      const tour: ITour = {
        name: `test ${i}`,
        description: 'test desc',
        tourOperator: 'test operator',
        price: '5000',
        img,
        type: 'all',
        date: new Date(),
      };

      data.push(tour);
    }
    await this.tourModel.insertMany(data);
    return await this.getAllTours();
  }

  async deleteAllTours(): Promise<any> {
    return this.tourModel.deleteMany({});
  }

  async getAllTours(): Promise<ITour[]> {
    return this.tourModel.find({});
  }

  async getTourById(id: string): Promise<ITour> {
    return this.tourModel.findById(id);
  }
  async createTour(tour: CreateTourDto) {
    const tourDto = await new this.tourModel(tour).save();
    return tourDto;
  }
  async uploadTour(updateTourDto: UpdateTourDto): Promise<Tour> {
    const tourDto = await new this.tourModel(updateTourDto).save();
    return tourDto;
  }

  async getToursByName(name: string): Promise<ITour[]> {
    return this.tourModel.find({ name: { $regex: name, $options: 'i' } });
  }
}
