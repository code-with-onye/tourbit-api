import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TourService } from './tour.service';
import { StepDto, TourDto } from './dto/tour-dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { TokenGuard } from 'src/token/guard/token.guard';
import { TourProgressService } from './tour-progress.service';
import { TourProgress } from './schema/tour-progress.schema';

@Controller('tour')
export class TourController {
  constructor(
    private tourService: TourService,
    private tourProgressService: TourProgressService,
  ) {}

  @Get('progress')
  async getTourProgress(
    @Query('user') user: string,
    @Query('tour') tour: string,
  ): Promise<TourProgress> {
    return this.tourProgressService.getProgress(user, tour);
  }

  @Patch('progress')
  async updateTourProgress(
    @Query('user') user: string,
    @Query('tour') tour: string,
    @Query('increment') increment: number,
    @Query('totalStep') totalStep: number,
  ) {
    return this.tourProgressService.updateProgress(
      user,
      tour,
      increment,
      totalStep,
    );
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createTour(@Body() body: TourDto, @Request() req) {
    return this.tourService.createTour({ ...body, userId: req.user.sub });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getTours() {
    return this.tourService.getTours();
  }

  @UseGuards(AuthGuard)
  @Get(':tourId')
  async getTour(@Param('tourId') tourId: string) {
    return this.tourService.getTour(tourId);
  }

  @UseGuards(AuthGuard)
  @Delete(':tourId')
  async deleteTour(@Param('tourId') tourId: string) {
    return this.tourService.deleteTour(tourId);
  }

  @UseGuards(AuthGuard)
  @Patch(':tourId')
  async updateTour(@Param('tourId') tourId: string, @Body() body) {
    return this.tourService.updateTour(tourId, body);
  }

  @UseGuards(AuthGuard)
  @Patch('add-step/:tourId')
  async addStepToTour(@Param('tourId') tourId: string, @Body() step: StepDto) {
    return this.tourService.addStepToTour(tourId, step);
  }

  @UseGuards(AuthGuard)
  @Patch(':tourId/steps/:stepId')
  async updateStep(
    @Param('tourId') tourId: string,
    @Param('stepId') stepId: string,
    @Body() updateStepDto: StepDto,
  ) {
    return this.tourService.updateStepInTour(tourId, stepId, updateStepDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':tourId/steps/:stepId/delete')
  async deleteStep(
    @Param('tourId') tourId: string,
    @Param('stepId') stepId: string,
  ) {
    return this.tourService.deleteStepInTour(tourId, stepId);
  }

  @UseGuards(TokenGuard)
  @Get('/public-tour/:tourId')
  async getPublicTour(
    @Headers('authorization') authHeader: string,
    @Param('tourId') tourId: string,
  ) {
    const token = authHeader.split(' ')[1];
    const tour = this.tourService.getPublicTour(token, tourId);
    return tour;
  }

  @UseGuards(TokenGuard)
  @Patch('/public-update/:tourId')
  async updatePublicTour(@Param('tourId') tourId: string, @Body() body) {
    return this.tourService.updatePublicTour(tourId, body);
  }

  @Post('progress')
  async trackProgress(@Body() body) {
    return this.tourProgressService.trackProgress(body);
  }
}
