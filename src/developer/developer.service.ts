import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Developer } from './schema/developer.schema';

@Injectable()
export class DeveloperService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Developer.name) private developerModel: Model<Developer>,
  ) {}

  async generateToken(email: string, userId: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const developer = await this.developerModel.findOne({ userId });

    const tokenVersion = developer?.tokenVersion
      ? developer.tokenVersion + 1
      : 1;

    const payload = { email: user.email, sub: user._id, tokenVersion };
    const token = this.jwtService.sign(payload);

    await this.developerModel.updateOne(
      { userId },
      { $set: { token, userId, tokenVersion } },
      { upsert: true },
    );

    return { token };
  }

  async validateToken(token: string) {
    let payload;
    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const developer = await this.developerModel.findOne({
      userId: payload.sub,
    });
    if (!developer || payload.tokenVersion !== developer.tokenVersion) {
      throw new UnauthorizedException('Invalid token');
    }

    return developer;
  }

  async getMyToken(userId: string) {
    return await this.developerModel.findOne({ userId });
  }
}
