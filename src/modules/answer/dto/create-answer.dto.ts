import { IsNumber, IsOptional, IsBoolean, IsString } from 'class-validator';

export class CreateAnswerDto {
    @IsNumber()
    questionId!: number;

    @IsNumber()
    studentId!: number;

    @IsOptional()
    @IsBoolean()
    booleanValue?: boolean;

    @IsOptional()
    @IsNumber()
    numericValue?: number;

    @IsOptional()
    @IsString()
    textValue?: string;
}
