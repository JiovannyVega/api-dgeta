import { IsString, IsNumber, MaxLength } from 'class-validator';

export class CreateMunicipalityDto {
    @IsString()
    @MaxLength(100)
    name!: string;

    @IsNumber()
    stateId!: number;
}
