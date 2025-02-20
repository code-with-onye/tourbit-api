import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Developer } from './schema/developer.schema';
export declare class DeveloperService {
    private readonly jwtService;
    private userModel;
    private developerModel;
    constructor(jwtService: JwtService, userModel: Model<User>, developerModel: Model<Developer>);
    generateToken(email: string, userId: string): Promise<{
        token: string;
    }>;
    validateToken(token: string): Promise<import("mongoose").Document<unknown, {}, Developer> & Developer & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getMyToken(userId: string): Promise<import("mongoose").Document<unknown, {}, Developer> & Developer & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
