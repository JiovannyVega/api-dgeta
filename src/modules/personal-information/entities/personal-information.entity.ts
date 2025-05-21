import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { GenderEnum } from '../dto/create-personal-information.dto';

@Entity({ tableName: 'personal_information' })
export class PersonalInformation {
    @PrimaryKey()
    info_id?: number;

    @Property()
    user_id!: number;

    @Property({ nullable: true })
    curp?: string;

    @Property()
    first_name!: string;

    @Property()
    last_name!: string;

    @Property({ nullable: true })
    middle_name?: string;

    @Property({ nullable: true })
    birth_date?: Date;

    @Property({ nullable: true, type: 'string' })
    gender?: GenderEnum;

    @Property({ nullable: true })
    phone?: string;

    @Property({ nullable: true })
    mobile?: string;

    @Property({ nullable: true })
    address?: string;

    @Property({ nullable: true })
    neighborhood?: string;

    @Property({ nullable: true })
    municipality_id?: number;

    @Property({ nullable: true })
    postal_code?: string;

    @Property({ nullable: true })
    photo?: string;
}
