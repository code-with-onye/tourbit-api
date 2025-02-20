import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(body: UserDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/signedInuser.schema").SignedInuser> & import("./schema/signedInuser.schema").SignedInuser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
