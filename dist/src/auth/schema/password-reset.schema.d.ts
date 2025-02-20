export declare class PasswordReset {
    userId: string;
    token: string;
    expiresAt: Date;
}
export declare const PasswordResetSchema: import("mongoose").Schema<PasswordReset, import("mongoose").Model<PasswordReset, any, any, any, import("mongoose").Document<unknown, any, PasswordReset> & PasswordReset & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PasswordReset, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PasswordReset>> & import("mongoose").FlatRecord<PasswordReset> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
