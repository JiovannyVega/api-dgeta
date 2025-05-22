import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'group_subjects' })
export class GroupSubject {
    @PrimaryKey()
    group_subject_id?: number;

    @Property()
    group_id!: number;

    @Property()
    subject_id!: number;

    @Property()
    teacher_id!: number;

    @Property()
    period!: string;
}
