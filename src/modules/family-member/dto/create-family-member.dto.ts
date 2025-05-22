import { IsInt, IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';

export class CreateFamilyMemberDto {
    @IsInt()
    student_id!: number;

    @IsString()
    name!: string;

    @IsString()
    relationship!: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsBoolean()
    is_guardian?: boolean;

    @IsOptional()
    @IsBoolean()
    lives_with_student?: boolean;
}
