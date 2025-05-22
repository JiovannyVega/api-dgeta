import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'subjects' })
export class Subject {
    @PrimaryKey()
    subject_id?: number;

    @Property()
    subject_name!: string;

    @Property()
    subject_code!: string;

    @Property()
    semester!: number;

    @Property({ nullable: true })
    theory_hours?: number;

    @Property({ nullable: true })
    practice_hours?: number;

    @Property()
    specialty_id!: number;
}
