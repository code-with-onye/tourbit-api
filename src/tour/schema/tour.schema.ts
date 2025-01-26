import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Step extends Document {
  @Prop({ required: true })
  selector: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  show: boolean;
}

export const StepSchema = SchemaFactory.createForClass(Step);

@Schema({ timestamps: true })
export class Tour extends Document {
  @Prop({ required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop()
  alias: string;

  @Prop()
  title: string;

  @Prop({ enum: ['draft', 'active', 'inactive'], default: 'draft' })
  status: string;

  @Prop({ type: [StepSchema], default: [] })
  steps: Step[];
}

export const TourSchema = SchemaFactory.createForClass(Tour);
