import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateQuestionnaireResultDto {
    @IsInt()
    questionnaire_id!: number;

    @IsInt()
    student_id!: number;

    @IsString()
    application_date!: string;

    @IsOptional()
    @IsInt()
    total_score?: number;

    @IsOptional()
    @IsString()
    risk_level?: string;

    @IsOptional()
    @IsString()
    observations?: string;
}
