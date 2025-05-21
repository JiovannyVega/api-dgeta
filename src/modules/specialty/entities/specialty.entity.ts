import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'specialties' })
export class Specialty {
    @PrimaryKey()
    specialty_id?: number;

    @Property()
    specialty_name!: string;

    @Property()
    specialty_code!: string;

    @Property({ nullable: true })
    description?: string;
}
