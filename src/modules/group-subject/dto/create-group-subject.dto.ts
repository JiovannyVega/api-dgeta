import { IsInt, IsString } from 'class-validator';

export class CreateGroupSubjectDto {
    @IsInt()
    group_id!: number;

    @IsInt()
    subject_id!: number;

    @IsInt()
    teacher_id!: number;

    @IsString()
    period!: string;
}
