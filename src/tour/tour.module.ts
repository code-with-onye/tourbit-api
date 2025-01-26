import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SharedModule } from 'src/shared.module';
import { Step, StepSchema, Tour, TourSchema } from './schema/tour.schema';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { User, UserSchema } from 'src/auth/schema/user.schema';
import { Token, TokenSchema } from 'src/token/schemas/token.schema';
import { TokenService } from 'src/token/token.service';
import { TourProgressService } from './tour-progress.service';
import {
  TourProgress,
  TourProgressSchema,
} from './schema/tour-progress.schema';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
    MongooseModule.forFeature([{ name: Step.name, schema: StepSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([
      { name: TourProgress.name, schema: TourProgressSchema },
    ]),
  ],
  providers: [TourService, TokenService, TourProgressService],
  controllers: [TourController],
})
export class TourModule {}
