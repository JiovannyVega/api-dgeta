import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
    @IsString()
    subject_name!: string;

    @IsString()
    subject_code!: string;

    @IsInt()
    semester!: number;

    @IsOptional()
    @IsInt()
    theory_hours?: number;

    @IsOptional()
    @IsInt()
    practice_hours?: number;

    @IsInt()
    specialty_id!: number;
}
