import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/schema/user.schema';
import { SharedModule } from 'src/shared.module';
import { Developer, DeveloperSchema } from './schema/developer.schema';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Developer.name, schema: DeveloperSchema },
    ]),
  ],

  providers: [DeveloperService],
  controllers: [DeveloperController],
})
export class DeveloperModule {}
