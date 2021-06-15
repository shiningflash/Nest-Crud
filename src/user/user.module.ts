import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto, UserParamDto } from "./dto/user.dto";

@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]), UserDto, UserParamDto],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}