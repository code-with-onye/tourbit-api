import { SignedInuser } from './schema/signedInuser.schema';
import { Model } from 'mongoose';
export declare class UserService {
    private signedInUserModel;
    constructor(signedInUserModel: Model<SignedInuser>);
    createUser(data: any): Promise<import("mongoose").Document<unknown, {}, SignedInuser> & SignedInuser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
