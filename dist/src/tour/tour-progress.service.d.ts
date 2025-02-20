import { TourProgress } from './schema/tour-progress.schema';
import { Model } from 'mongoose';
import { ProgressDto } from './dto/tour-progress.dto';
export declare class TourProgressService {
    private readonly tourProgressModel;
    constructor(tourProgressModel: Model<TourProgress>);
    trackProgress(createTourProgress: ProgressDto): Promise<TourProgress>;
    getProgress(userId: string, alias: string): Promise<any>;
    updateProgress(user: string, tour: string, incrementValue: number, totalSteps: number): Promise<TourProgress>;
}
