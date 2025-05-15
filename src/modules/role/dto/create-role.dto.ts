import { IsString, IsOptional } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    role_name!: string;

    @IsOptional()
    @IsString()
    description?: string;
}
