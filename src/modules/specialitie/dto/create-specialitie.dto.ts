import { IsString } from 'class-validator';

export class CreateSpecialitieDto {
    @IsString()
    specialty_name!: string;

    @IsString()
    specialty_code!: string;

    @IsString()
    description!: string;
}
