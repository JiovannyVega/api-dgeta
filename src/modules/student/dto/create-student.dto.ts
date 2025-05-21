import { IsInt, IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

export enum StudentStatusEnum {
    Active = 'Active',
    Inactive = 'Inactive',
    Graduated = 'Graduated',
    Dropped = 'Dropped'
}

export class CreateStudentDto {
    @IsInt()
    user_id!: number;

    @IsOptional()
    @IsInt()
    group_id?: number;

    @IsString()
    control_number!: string;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 1 })
    secondary_average?: number;

    @IsOptional()
    @IsString()
    previous_school?: string;

    @IsOptional()
    @IsEnum(StudentStatusEnum)
    status?: StudentStatusEnum;
}
