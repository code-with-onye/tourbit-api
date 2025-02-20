import { DeveloperService } from './developer.service';
export declare class DeveloperController {
    private developerService;
    constructor(developerService: DeveloperService);
    generateToken(req: any): Promise<{
        token: {
            token: string;
        };
    }>;
    getMyToken(req: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/developer.schema").Developer> & import("./schema/developer.schema").Developer & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    validateMyToken(authHeader: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/developer.schema").Developer> & import("./schema/developer.schema").Developer & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
