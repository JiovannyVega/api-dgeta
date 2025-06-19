import { IsString, IsNumber, IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { AnswerType } from '../entities/answer-type.enum';

export class CreateQuestionDto {
    @IsNumber()
    questionnaireId!: number;

    @IsString()
    questionText!: string;

    @IsEnum(AnswerType)
    answerType!: AnswerType;

    @IsNumber()
    order!: number;

    @IsOptional()
    @IsBoolean()
    isRisk?: boolean;
}
