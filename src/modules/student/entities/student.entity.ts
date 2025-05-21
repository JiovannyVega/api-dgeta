import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { StudentStatusEnum } from '../dto/create-student.dto';

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

    @Property({ default: 'Active', type: 'string' })
    status: StudentStatusEnum = StudentStatusEnum.Active;
}
