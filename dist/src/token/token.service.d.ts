import { Model } from 'mongoose';
import { Token } from './schemas/token.schema';
export declare class TokenService {
    private tokenModel;
    constructor(tokenModel: Model<Token>);
    generateAndStoreToken(userId: string, email: string): Promise<string>;
    getToken(userId: string): Promise<string | null>;
    validateToken(token: string): Promise<{
        userId: string;
        email: string;
    } | null>;
}
