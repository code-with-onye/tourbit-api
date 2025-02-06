import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { TokenGuard } from 'src/token/guard/token.guard';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    
    @UseGuards(TokenGuard)
    @Post('create')
    async createUser(@Body() body: UserDto) {
        return this.userService.createUser(body);
    }
}
