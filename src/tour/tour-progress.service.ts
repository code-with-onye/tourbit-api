import { InjectModel } from '@nestjs/mongoose';
import { TourProgress } from './schema/tour-progress.schema';
import { Model } from 'mongoose';
import { ProgressDto } from './dto/tour-progress.dto';

export class TourProgressService {
  constructor(
    @InjectModel(TourProgress.name)
    private readonly tourProgressModel: Model<TourProgress>,
  ) {}

  async trackProgress(createTourProgress: ProgressDto): Promise<TourProgress> {
    const { user, tour } = createTourProgress;

    const existingProgress = await this.tourProgressModel
      .findOne({ user, tour })
      .exec();
    if (existingProgress) {
      return existingProgress;
    }

    return await this.tourProgressModel.create(createTourProgress);
  }

  async getProgress(userId: string, alias: string): Promise<any> {
    return this.tourProgressModel
      .aggregate([
        { $match: { user: userId, tour: alias } },
        {
          $lookup: {
            from: 'signedinusers',
            localField: 'user',
            foreignField: 'userId',
            as: 'userDetails',
          },
        },
        { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'tours',
            localField: 'tour',
            foreignField: 'alias',
            as: 'tourDetails',
          },
        },
        { $unwind: { path: '$tourDetails', preserveNullAndEmptyArrays: true } },
        { $limit: 1 },
      ])
      .exec()
      .then((results) => results[0] || null);
  }

  async updateProgress(
    user: string,
    tour: string,
    incrementValue: number,
    totalSteps: number,
  ): Promise<TourProgress> {
    try {
      const progress = await this.tourProgressModel
        .findOne({ user, tour })
        .exec();

      if (!progress) {
        throw new Error('Progress for the specified user and tour not found.');
      }

      progress.completedSteps = incrementValue;

      if (progress.completedSteps >= totalSteps) {
        progress.completedSteps = totalSteps;
        progress.isCompleted = true;
      } else {
        progress.isCompleted = false;
      }

      return await progress.save();
    } catch (error) {
      throw new Error(`Failed to update progress: ${error.message}`);
    }
  }
}
