import { StepDto, TourDto } from './dto/tour-dto';
import { Step, Tour } from './schema/tour.schema';
import { Model } from 'mongoose';
import { TokenService } from 'src/token/token.service';
export declare class TourService {
    private tourModel;
    private stepModel;
    private tokenService;
    constructor(tourModel: Model<Tour>, stepModel: Model<Step>, tokenService: TokenService);
    createTour(data: TourDto): Promise<import("mongoose").Document<unknown, {}, Tour> & Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getTours(userId: string): Promise<(import("mongoose").Document<unknown, {}, Tour> & Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getTour(tourId: string): Promise<import("mongoose").Document<unknown, {}, Tour> & Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteTour(tourId: string): Promise<import("mongoose").Document<unknown, {}, Tour> & Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addStepToTour(tourId: string, stepDto: StepDto): Promise<import("mongoose").Document<unknown, {}, Tour> & Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateStepInTour(tourId: string, stepId: string, stepDto: StepDto): Promise<import("mongoose").Document<unknown, {}, Tour> & Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteStepInTour(tourId: string, stepId: string): Promise<import("mongoose").Document<unknown, {}, Tour> & Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateTour(tourId: string, data: TourDto): Promise<import("mongoose").Document<unknown, {}, Tour> & Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getPublicTour(token: string, tourId: string): Promise<import("mongoose").Document<unknown, {}, Tour> & Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updatePublicTour(tourId: string, data: TourDto): Promise<import("mongoose").UpdateWriteOpResult>;
}
