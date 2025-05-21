import { IsString, IsInt, IsEnum } from 'class-validator';

export enum ShiftEnum {
    Morning = 'Morning',
    Evening = 'Evening',
    Night = 'Night'
}

export class CreateGroupDto {
    @IsString()
    group_name!: string;

    @IsEnum(ShiftEnum)
    shift!: ShiftEnum;

    @IsInt()
    semester!: number;

    @IsInt()
    specialty_id!: number;
}
