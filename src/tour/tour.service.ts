import { Injectable, NotFoundException } from '@nestjs/common';
import { StepDto, TourDto } from './dto/tour-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Step, Tour } from './schema/tour.schema';
import { Model } from 'mongoose';
import { generateTourAlias } from 'utils/generate-tour-alias';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class TourService {
  constructor(
    @InjectModel(Tour.name) private tourModel: Model<Tour>,
    @InjectModel(Step.name) private stepModel: Model<Step>,
    private tokenService: TokenService,
  ) {}

  async createTour(data: TourDto) {
    const alias = generateTourAlias();
    const tour = new this.tourModel({ ...data, alias: alias });
    return tour.save();
  }

  async getTours(userId: string) {
    const tours = await this.tourModel.find({ userId }).exec();
    return tours;
  }

  async getTour(tourId: string) {
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${tourId} not found`);
    }
    return tour;
  }

  async deleteTour(tourId: string) {
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${tourId} not found`);
    }
    return this.tourModel.findByIdAndDelete(tourId);
  }

  async addStepToTour(tourId: string, stepDto: StepDto) {
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${tourId} not found`);
    }
    const step = new this.stepModel(stepDto);
    tour.steps.push(step);

    return tour.save();
  }

  async updateStepInTour(tourId: string, stepId: string, stepDto: StepDto) {
    const tour = await this.tourModel.findById(tourId);

    if (!tour) {
      throw new NotFoundException(`Tour with ID "${tourId}" not found`);
    }

    const step = tour.steps.find((step) => step._id.toString() === stepId);
    if (!step) {
      throw new NotFoundException(`Step with ID "${stepId}" not found`);
    }

    Object.assign(step, stepDto);
    await tour.save();
    return tour;
  }

  async deleteStepInTour(tourId: string, stepId: string) {
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      throw new NotFoundException(`Tour with ID "${tourId}" not found`);
    }

    const step = tour.steps.find((step) => step._id.toString() === stepId);
    if (!step) {
      throw new NotFoundException(`Step with ID "${stepId}" not found`);
    }

    tour.steps = tour.steps.filter((step) => step._id.toString() !== stepId);
    await tour.save();
    return tour;
  }

  async updateTour(tourId: string, data: TourDto) {
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${tourId} not found`);
    }
    return this.tourModel.findByIdAndUpdate(tourId, data, { new: true });
  }

  async getPublicTour(token: string, tourId: string) {
    const varifyToken = await this.tokenService.validateToken(token);
    const userId = varifyToken.userId;
    const tour = await this.tourModel.findOne({
      userId,
      alias: tourId,
    });
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${tourId} not found`);
    }
    return tour;
  }

  async updatePublicTour(tourId: string, data: TourDto) {
    const tour = await this.tourModel.find({ alias: tourId });
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${tourId} not found`);
    }
    return this.tourModel.updateOne({ alias: tourId }, data);
  }
}
