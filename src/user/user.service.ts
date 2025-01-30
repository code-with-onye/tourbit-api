import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignedInuser } from './schema/signedInuser.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(SignedInuser.name)
    private signedInUserModel: Model<SignedInuser>,
  ) {}

  async createUser(data: any) {
    const existingUser = await this.signedInUserModel.findOne({ email: data.email });
    if (existingUser) {
      return null;
    }
    
    const user = new this.signedInUserModel(data);
    return user.save();
  }
}
