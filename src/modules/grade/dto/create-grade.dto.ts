import { IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateGradeDto {
    @IsInt()
    student_id!: number;

    @IsInt()
    group_subject_id!: number;

    @IsOptional()
    @IsNumber()
    partial_1?: number;

    @IsOptional()
    @IsNumber()
    partial_2?: number;

    @IsOptional()
    @IsNumber()
    partial_3?: number;

    @IsOptional()
    @IsNumber()
    final_grade?: number;
}
