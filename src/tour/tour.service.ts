import { Injectable, NotFoundException } from '@nestjs/common';
import { StepDto, TourDto } from './dto/tour-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tour } from './schema/tour.schema';
import { Model } from 'mongoose';
import { generateTourAlias } from 'utils/generate-tour-alias';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class TourService {
  constructor(
    @InjectModel(Tour.name) private tourModel: Model<Tour>,
    private tokenService: TokenService,
  ) {}

  async createTour(data: TourDto) {
    const alias = generateTourAlias();
    const tour = new this.tourModel({ ...data, alias: alias });
    return tour.save();
  }

  async getTours() {
    const tours = await this.tourModel.find().exec();
    return tours;
  }

  async addStepToTour(tourId: string, stepDto: StepDto) {
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      throw new NotFoundException(`Tour with ID ${tourId} not found`);
    }
    tour.steps.push(stepDto);
    return tour.save();
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
