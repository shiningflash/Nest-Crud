import { IsString, IsEmail, IsDefined } from 'class-validator';

export class UserDto {
    @IsString()
    @IsEmail()
    @IsDefined()
    email: string;

    @IsString()
    @IsDefined()
    username: string;
}

export class UserParamDto {
    @IsString()
    @IsEmail()
    @IsDefined()
    email: string;
}