import {
  Controller,
  Get,
  Request,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('developer')
export class DeveloperController {
  constructor(private developerService: DeveloperService) {}

  @UseGuards(AuthGuard)
  @Get()
  async generateToken(@Request() req) {
    const user = req.user;
    const token = await this.developerService.generateToken(
      user.email,
      user.sub,
    );
    return { token };
  }

  @UseGuards(AuthGuard)
  @Get('/my-token')
  async getMyToken(@Request() req) {
    const user = req.user;
    return await this.developerService.getMyToken(user.sub);
  }

  @Get('/validate-token')
  async validateMyToken(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new Error('Token is missing in the Authorization header');
    }

    return await this.developerService.validateToken(token);
  }
}
