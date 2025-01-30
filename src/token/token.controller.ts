import {
  Controller,
  Post,
  Body,
  Get,
  Headers,
  UnauthorizedException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { TokenGuard } from './guard/token.guard';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @UseGuards(AuthGuard)
  @Post()
  async generateToken(@Req() req) {
    const user = req.user;
    const token = await this.tokenService.generateAndStoreToken(
      user.sub,
      user.email,
    );
    return { token };
  }

  @UseGuards(AuthGuard)
  @Get()
  async getToken(@Req() req) {
    const user = req.user;
    const token = await this.tokenService.getToken(user.sub);
    return { token };
  }

  @UseGuards(TokenGuard)
  @Get('validate-token')
  async validateToken(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new Error('Token is missing in the Authorization header');
    }

    const userData = await this.tokenService.validateToken(token);
    if (!userData) {
      throw new UnauthorizedException('Invalid token');
    }

    return userData;
  }
}
