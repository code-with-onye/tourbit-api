import { AuthService } from '../auth.service';
declare const GithubStrategy_base: new (...args: any[]) => any;
export declare class GithubStrategy extends GithubStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any>;
}
export {};
