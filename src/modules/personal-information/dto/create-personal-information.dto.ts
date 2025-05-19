import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreatePersonalInformationDto {
    @IsInt()
    user_id!: number;

    @IsOptional()
    @IsString()
    curp?: string;

    @IsString()
    first_name!: string;

    @IsString()
    last_name!: string;

    @IsOptional()
    @IsString()
    middle_name?: string;

    @IsOptional()
    @IsDateString()
    birth_date?: string;

    @IsOptional()
    @IsString()
    gender?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    mobile?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    neighborhood?: string;

    @IsOptional()
    @IsInt()
    municipality_id?: number;

    @IsOptional()
    @IsString()
    postal_code?: string;

    @IsOptional()
    @IsString()
    photo?: string;
}
