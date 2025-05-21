import { IsString, IsOptional } from 'class-validator';

export class CreateSpecialitieDto {
    @IsString()
    specialty_name!: string;

    @IsString()
    specialty_code!: string;

    @IsOptional()
    @IsString()
    description?: string;
}
