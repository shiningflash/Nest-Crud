import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) {}

    async insertUser(user: UserDto) {
        const newUser = new this.userModel({email: user.email, username: user.username});
        await newUser.save();
        return this.formatUser(newUser);
    }

    async getAllUser() {
        const users = await this.userModel.find();
        return users.map(user => this.formatUser(user)) as User[];
    }

    async getSingleUser(email: string) {
        const user = await this.findUser(email);
        return this.formatUser(user);
    }

    async deleteUser(email: string) {
        const result = await this.userModel.deleteOne({email: email}).exec();
        if (result.n == 0) {
            throw new NotFoundException('User not found!');
        }
    }

    private async findUser(email: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findOne({email: email}).exec();
        } catch(error) {
            throw new NotFoundException('User not found!');
        }
        if (!user) {
            throw new NotFoundException('User not found!');
        }
        return user;
    }

    formatUser(user: User) {
        return {
            'email': user.email,
            'username': user.username
        }
    }
}