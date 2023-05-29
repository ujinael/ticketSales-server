import { PickType } from '@nestjs/mapped-types';
import { Tour } from '../entities/tour.entity';

export class CreateTourDto extends PickType(Tour, [
  'name',
  'date',
  'description',
  'img',
  'tourOperator',
  'type',
  'price',
]) {}
