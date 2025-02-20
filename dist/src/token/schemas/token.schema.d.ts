import { Document } from 'mongoose';
export declare class Token extends Document {
    token: string;
    userId: string;
    email: string;
}
export declare const TokenSchema: import("mongoose").Schema<Token, import("mongoose").Model<Token, any, any, any, Document<unknown, any, Token> & Token & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Token, Document<unknown, {}, import("mongoose").FlatRecord<Token>> & import("mongoose").FlatRecord<Token> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
