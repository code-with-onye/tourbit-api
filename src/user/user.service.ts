import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignedInuser } from './schema/signedInuser.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(SignedInuser.name)
    private signedInUserModel: Model<SignedInuser>,
  ) {}

  async createUser(data: any) {
    const user = new this.signedInUserModel(data);
    return user.save();
  }
}
