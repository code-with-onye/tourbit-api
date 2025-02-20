import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class Step extends Document {
    selector: string;
    title: string;
    content: string;
    show: boolean;
}
export declare const StepSchema: MongooseSchema<Step, import("mongoose").Model<Step, any, any, any, Document<unknown, any, Step> & Step & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Step, Document<unknown, {}, import("mongoose").FlatRecord<Step>> & import("mongoose").FlatRecord<Step> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class Tour extends Document {
    userId: MongooseSchema.Types.ObjectId;
    alias: string;
    title: string;
    status: string;
    steps: Step[];
}
export declare const TourSchema: MongooseSchema<Tour, import("mongoose").Model<Tour, any, any, any, Document<unknown, any, Tour> & Tour & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tour, Document<unknown, {}, import("mongoose").FlatRecord<Tour>> & import("mongoose").FlatRecord<Tour> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
