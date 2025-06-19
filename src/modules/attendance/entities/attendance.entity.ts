import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Student } from '../../student/entities/student.entity';
import { GroupSubject } from '../../group-subject/entities/group-subject.entity';

@Entity({ tableName: 'attendance' })
export class Attendance {
    @PrimaryKey({ fieldName: 'attendance_id' })
    attendanceId!: number;

    @ManyToOne(() => Student, { fieldName: 'student_id', referenceColumnName: 'student_id' })
    student!: Student;

    @ManyToOne(() => GroupSubject, { fieldName: 'group_subject_id', referenceColumnName: 'group_subject_id' })
    groupSubject!: GroupSubject;

    @Property({ fieldName: 'date', type: 'date' })
    date!: Date;

    @Property({ fieldName: 'attended', type: 'boolean', default: false })
    attended: boolean = false;

    @Property({ fieldName: 'justification', type: 'text', nullable: true })
    justification?: string;

    constructor(student: Student, groupSubject: GroupSubject, date: Date, attended: boolean = false, justification?: string) {
        this.student = student;
        this.groupSubject = groupSubject;
        this.date = date;
        this.attended = attended;
        this.justification = justification;
    }
}
