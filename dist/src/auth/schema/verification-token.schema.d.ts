export declare class VerificationToken {
    userId: string;
    token: string;
    expiresAt: Date;
}
export declare const VerificationTokenSchema: import("mongoose").Schema<VerificationToken, import("mongoose").Model<VerificationToken, any, any, any, import("mongoose").Document<unknown, any, VerificationToken> & VerificationToken & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VerificationToken, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<VerificationToken>> & import("mongoose").FlatRecord<VerificationToken> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
