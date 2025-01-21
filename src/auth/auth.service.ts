import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schema/user.schema';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async signup(data: SignupDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new this.userModel({ ...data, password: hashedPassword });
    return user.save();
  }

  async signin(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user.email,
      sub: user._id,
      name: `${user.firstname} ${user.lastname}`,
    };
    return { access_token: this.jwtService.sign(payload), ...payload };
  }

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: string,
  ): Promise<string> {
    let user = await this.userModel.findOne({
      [`${provider}Id`]: thirdPartyId,
    });

    if (!user) {
      user = new this.userModel({
        [`${provider}Id`]: thirdPartyId,
      });
      await user.save();
    }

    const payload = { sub: user._id };
    return this.jwtService.sign(payload);
  }
}
