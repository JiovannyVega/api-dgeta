import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'grades' })
export class Grade {
    @PrimaryKey()
    grade_id?: number;

    @Property()
    student_id!: number;

    @Property()
    group_subject_id!: number;

    @Property({ nullable: true, type: 'float' })
    partial_1?: number;

    @Property({ nullable: true, type: 'float' })
    partial_2?: number;

    @Property({ nullable: true, type: 'float' })
    partial_3?: number;

    @Property({ nullable: true, type: 'float' })
    final_grade?: number;

    @Property({ onCreate: () => new Date(), type: 'date' })
    update_date?: Date;
}
