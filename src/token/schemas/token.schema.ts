import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Token extends Document {
  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  email: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
