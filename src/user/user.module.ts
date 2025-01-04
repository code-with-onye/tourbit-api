import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SharedModule } from 'src/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import {  SignedInuser, SignedUserSchema } from './schema/signedInuser.schema';
import { TokenService } from 'src/token/token.service';
import { Token, TokenSchema } from 'src/token/schemas/token.schema';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: SignedInuser.name, schema: SignedUserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, TokenService],
})
export class UserModule {}
