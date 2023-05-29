import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { ToursService } from './tours.service';
import { ITour } from './interfaces/tour.interface';
import { CreateTourDto } from './dto/create-tour.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}
  static imgName: string;
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTours(): Promise<ITour[]> {
    return this.toursService.getAllTours();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTourById(@Param('id') id): Promise<ITour> {
    return this.toursService.getTourById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('tour_by_name/:name')
  async getToursByName(@Param('name') name): Promise<ITour[]> {
    return this.toursService.getToursByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async generateTours(): Promise<ITour[]> {
    return this.toursService.generateTours();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create_tour')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './public/',
        filename: (req, file, cb) => {
          const imgType = file.mimetype.split('/');
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const imgName =
            file.fieldname + '-' + uniqueSuffix + '.' + imgType[1];
          cb(null, imgName);
          ToursController.imgName = imgName;
        },
      }),
    }),
  )
  async createTour(@Body() createTourDto: CreateTourDto): Promise<any> {
    createTourDto.img = ToursController.imgName;
    createTourDto.type = 'all';
    return this.toursService.createTour(createTourDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('remove')
  async removeAllTours(): Promise<any> {
    return this.toursService.deleteAllTours();
  }
}
