import { TokenService } from './token.service';
export declare class TokenController {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    generateToken(req: any): Promise<{
        token: string;
    }>;
    getToken(req: any): Promise<{
        token: string;
    }>;
    validateToken(authHeader: string): Promise<{
        userId: string;
        email: string;
    }>;
}
