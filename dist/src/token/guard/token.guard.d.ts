import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenService } from '../token.service';
export declare class TokenGuard implements CanActivate {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
