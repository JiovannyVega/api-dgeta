import { IsString, IsInt } from 'class-validator';

export class CreateGroupDto {
    @IsString()
    group_name!: string;

    @IsString()
    shift!: string;

    @IsInt()
    semester!: number;

    @IsInt()
    specialty_id!: number;
}
