import { Document } from 'mongoose';
export declare class SignedInuser extends Document {
    userId: string;
    tourId: string;
    name: string;
    email: string;
}
export declare const SignedUserSchema: import("mongoose").Schema<SignedInuser, import("mongoose").Model<SignedInuser, any, any, any, Document<unknown, any, SignedInuser> & SignedInuser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SignedInuser, Document<unknown, {}, import("mongoose").FlatRecord<SignedInuser>> & import("mongoose").FlatRecord<SignedInuser> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
