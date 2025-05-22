import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { TeacherStatusEnum } from '../dto/create-teacher.dto';

@Entity({ tableName: 'teachers' })
export class Teacher {
    @PrimaryKey()
    teacher_id?: number;

    @Property()
    user_id!: number;

    @Property()
    employee_number!: string;

    @Property({ nullable: true })
    academic_degree?: string;

    @Property({ nullable: true })
    specialty?: string;

    @Property({ default: TeacherStatusEnum.Active, type: 'string' })
    status?: TeacherStatusEnum = TeacherStatusEnum.Active;
}
