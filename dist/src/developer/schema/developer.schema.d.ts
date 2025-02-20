import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class Developer extends Document {
    token: string;
    tokenVersion: number;
    userId: MongooseSchema.Types.ObjectId;
}
export declare const DeveloperSchema: MongooseSchema<Developer, import("mongoose").Model<Developer, any, any, any, Document<unknown, any, Developer> & Developer & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Developer, Document<unknown, {}, import("mongoose").FlatRecord<Developer>> & import("mongoose").FlatRecord<Developer> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
