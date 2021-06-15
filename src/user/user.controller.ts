import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    Delete,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { UserDto, UserParamDto } from './dto/user.dto';

import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService ) {};

    @Post()
    @UsePipes(new ValidationPipe())
    async addUser(@Body() userDto: UserDto) {
        const user = await this.userService.insertUser(userDto);
        return user;
    }

    @Get()
    async getAllUser() {
        const users = await this.userService.getAllUser();
        return users;
    }

    @Get(':email') 
    async getUser(@Param() param: UserParamDto) {
        const user = await this.userService.getSingleUser(param.email);
        return user;
    }

    @Delete(':email')
    async deleteUser(@Param() param: UserParamDto) {
        await this.userService.deleteUser(param.email);
        return { success: true, message: 'Deleted successfully '}
    }
}