import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { SignupDto } from './dto/signup.dto';
export declare class AuthService {
    private jwtService;
    private userModel;
    constructor(jwtService: JwtService, userModel: Model<User>);
    signup(data: SignupDto): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    signin(email: string, password: string): Promise<{
        email: string;
        sub: unknown;
        name: string;
        access_token: string;
    }>;
    validateOAuthLogin(thirdPartyId: string, provider: string): Promise<string>;
}
