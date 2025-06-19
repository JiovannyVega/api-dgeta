import { IsNumber, IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAttendanceDto {
    @IsNumber()
    studentId!: number;

    @IsNumber()
    groupSubjectId!: number;

    @IsDateString()
    date!: string;

    @IsOptional()
    @IsBoolean()
    attended?: boolean;

    @IsOptional()
    @IsString()
    justification?: string;
}
