import { IsInt, IsString, IsEmail, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsInt()
    role_id!: number;

    @IsString()
    @MinLength(3)
    username!: string;

    @IsString()
    @MinLength(6)
    password_hash!: string;

    @IsEmail()
    email!: string;

    @IsOptional()
    registration_date?: string;

    @IsOptional()
    last_login?: string;

    @IsBoolean()
    active!: boolean;
}
