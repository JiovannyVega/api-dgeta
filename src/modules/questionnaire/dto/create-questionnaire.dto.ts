import { IsString, IsOptional } from 'class-validator';

export class CreateQuestionnaireDto {
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    version?: string;

    @IsOptional()
    @IsString()
    creation_date?: string;
}
