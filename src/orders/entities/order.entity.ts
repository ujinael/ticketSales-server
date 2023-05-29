import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IOrder } from '../interfaces/order.interface';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order implements IOrder {
  @Prop() age: string;
  @Prop() birthDate: Date;
  @Prop() cardNumber: string;
  @Prop() tourId: string;
  @Prop() userId: string;
  @Prop() firstName: string;
  @Prop() lastName: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
