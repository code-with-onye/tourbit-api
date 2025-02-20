import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(body: SignupDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/user.schema").User> & import("./schema/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    signin(body: {
        email: string;
        password: string;
    }): Promise<{
        email: string;
        sub: unknown;
        name: string;
        access_token: string;
    }>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): Promise<string>;
    githubAuth(req: any): Promise<void>;
    githubAuthRedirect(req: any): Promise<string>;
}
