import { Document } from 'mongoose';
export declare class TourProgress extends Document {
    user: string;
    tour: string;
    completedSteps: number;
    isCompleted: boolean;
}
export declare const TourProgressSchema: import("mongoose").Schema<TourProgress, import("mongoose").Model<TourProgress, any, any, any, Document<unknown, any, TourProgress> & TourProgress & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TourProgress, Document<unknown, {}, import("mongoose").FlatRecord<TourProgress>> & import("mongoose").FlatRecord<TourProgress> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
