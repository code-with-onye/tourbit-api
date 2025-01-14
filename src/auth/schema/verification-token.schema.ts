import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class VerificationToken {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true, expires: '24h' })
  expiresAt: Date;
}

export const VerificationTokenSchema =
  SchemaFactory.createForClass(VerificationToken);
