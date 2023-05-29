import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop() passwordHash: string;
  @Prop() login: string;
  @Prop() email: string;
  @Prop() loyalityCardNumber?: string;
}

// export const UserSchema = SchemaFactory.createForClass(User);
const UserSchema = SchemaFactory.createForClass(User);
// Duplicate the ID field.
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
  virtuals: true,
});
export { UserSchema };
