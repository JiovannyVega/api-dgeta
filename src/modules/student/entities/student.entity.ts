import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'students' })
export class Student {
    @PrimaryKey()
    student_id?: number;

    @Property()
    user_id!: number;

    @Property({ nullable: true })
    group_id?: number;

    @Property()
    control_number!: string;

    @Property({ nullable: true, type: 'float' })
    secondary_average?: number;

    @Property({ nullable: true })
    previous_school?: string;

    @Property({ default: 'Active' })
    status: 'Active' | 'Inactive' | 'Graduated' | 'Dropped' = 'Active';
}
