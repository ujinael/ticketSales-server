import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ITour } from '../interfaces/tour.interface';

export type TourDocument = HydratedDocument<Tour>;

@Schema()
export class Tour implements ITour {
  @Prop() name: string;

  @Prop() description: string;

  @Prop() tourOperator: string;

  @Prop() price: string;

  @Prop() img: string;

  // @Prop() id?: string;

  @Prop() type: string;

  @Prop() date: Date;
}
const TourSchema = SchemaFactory.createForClass(Tour);
// Duplicate the ID field.
TourSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TourSchema.set('toJSON', {
  virtuals: true,
});
export { TourSchema };
