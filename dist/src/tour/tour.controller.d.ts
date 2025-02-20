import { TourService } from './tour.service';
import { StepDto, TourDto } from './dto/tour-dto';
import { TourProgressService } from './tour-progress.service';
import { TourProgress } from './schema/tour-progress.schema';
export declare class TourController {
    private tourService;
    private tourProgressService;
    constructor(tourService: TourService, tourProgressService: TourProgressService);
    getTourProgress(user: string, tour: string): Promise<TourProgress>;
    updateTourProgress(user: string, tour: string, increment: number, totalStep: number): Promise<TourProgress>;
    createTour(body: TourDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/tour.schema").Tour> & import("./schema/tour.schema").Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getTours(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./schema/tour.schema").Tour> & import("./schema/tour.schema").Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getTour(tourId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/tour.schema").Tour> & import("./schema/tour.schema").Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteTour(tourId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/tour.schema").Tour> & import("./schema/tour.schema").Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateTour(tourId: string, body: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/tour.schema").Tour> & import("./schema/tour.schema").Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addStepToTour(tourId: string, step: StepDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/tour.schema").Tour> & import("./schema/tour.schema").Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateStep(tourId: string, stepId: string, updateStepDto: StepDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/tour.schema").Tour> & import("./schema/tour.schema").Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteStep(tourId: string, stepId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/tour.schema").Tour> & import("./schema/tour.schema").Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getPublicTour(authHeader: string, tourId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/tour.schema").Tour> & import("./schema/tour.schema").Tour & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updatePublicTour(tourId: string, body: any): Promise<import("mongoose").UpdateWriteOpResult>;
    trackProgress(body: any): Promise<TourProgress>;
}
