import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export enum TeacherStatusEnum {
    Active = 'Active',
    Inactive = 'Inactive'
}

export class CreateTeacherDto {
    @IsInt()
    user_id!: number;

    @IsString()
    employee_number!: string;

    @IsOptional()
    @IsString()
    academic_degree?: string;

    @IsOptional()
    @IsString()
    specialty?: string;

    @IsOptional()
    @IsEnum(TeacherStatusEnum)
    status?: TeacherStatusEnum;
}
