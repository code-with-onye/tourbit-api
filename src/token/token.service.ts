import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from './schemas/token.schema';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}

  async generateAndStoreToken(userId: string, email: string): Promise<string> {
    const token = `tourbit_${crypto.randomBytes(16).toString('hex')}`;

    // Store token in MongoDB
    await this.tokenModel.updateOne(
      { userId },
      { $set: { token, userId, email } },
      { upsert: true },
    );

    return token;
  }

  async validateToken(
    token: string,
  ): Promise<{ userId: string; email: string } | null> {
    const tokenDoc = await this.tokenModel.findOne({ token }).exec();

    if (!tokenDoc) return null;

    return { userId: tokenDoc.userId, email: tokenDoc.email };
  }
}
