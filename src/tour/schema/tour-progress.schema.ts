import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class TourProgress extends Document {
  @Prop({ type: String, required: true })
  user: string;

  @Prop({ type: String, required: true })
  tour: string;

  @Prop({ required: true, default: 0 })
  completedSteps: number;

  @Prop({ required: true, default: false })
  isCompleted: boolean;
}

export const TourProgressSchema = SchemaFactory.createForClass(TourProgress);
