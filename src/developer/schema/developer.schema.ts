import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Developer extends Document {
  @Prop({ required: true })
  token: string;
  @Prop({ required: true })
  tokenVersion: number;
  @Prop({ required: true })
  userId: MongooseSchema.Types.ObjectId;
}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);
