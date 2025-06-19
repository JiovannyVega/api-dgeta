import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateStateDto {
    @IsString()
    @MaxLength(100)
    name!: string;

    @IsOptional()
    @IsString()
    @MaxLength(10)
    code?: string;
}
