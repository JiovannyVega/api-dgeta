import { IsInt, IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

export class CreateStudentDto {
    @IsInt()
    user_id!: number;

    @IsOptional()
    @IsInt()
    group_id?: number;

    @IsString()
    control_number!: string;

    @IsOptional()
    @IsNumber()
    secondary_average?: number;

    @IsOptional()
    @IsString()
    previous_school?: string;

    @IsOptional()
    @IsEnum(['Active', 'Inactive', 'Graduated', 'Dropped'])
    status?: 'Active' | 'Inactive' | 'Graduated' | 'Dropped';
}
