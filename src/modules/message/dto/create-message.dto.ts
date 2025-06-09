import { IsInt, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateMessageDto {
    @IsInt()
    sender_id!: number;

    @IsInt()
    receiver_id!: number;

    @IsString()
    subject!: string;

    @IsString()
    content!: string;

    @IsOptional()
    sent_date?: string;

    @IsOptional()
    @IsBoolean()
    read?: boolean;
}
