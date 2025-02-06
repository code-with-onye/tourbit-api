import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SignedInuser extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  tourId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const SignedUserSchema = SchemaFactory.createForClass(SignedInuser);
