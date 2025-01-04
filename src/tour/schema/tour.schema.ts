import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class Step {
  @Prop({ required: true })
  selector: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const StepSchema = SchemaFactory.createForClass(Step);

@Schema({ timestamps: true })
export class Tour extends Document {
  @Prop({ required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  alias: string;

  @Prop({ required: true })
  title: string;

  @Prop({ enum: ['draft', 'active', 'inactive'], default: 'draft' })
  status: string;

  @Prop({ type: [StepSchema], default: [] })
  steps: Step[];
}

export const TourSchema = SchemaFactory.createForClass(Tour);
