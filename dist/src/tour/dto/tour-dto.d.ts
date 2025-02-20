import { Types } from 'mongoose';
export declare class StepDto {
    selector: string;
    title: string;
    content: string;
    show: boolean;
}
export declare class TourDto {
    userId: Types.ObjectId;
    title: string;
    status: string;
    steps: StepDto[];
}
