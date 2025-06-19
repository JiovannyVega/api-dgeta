import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Question } from '../../question/entities/question.entity';
import { Student } from '../../student/entities/student.entity';

@Entity({ tableName: 'answers' })
export class Answer {
    @PrimaryKey({ fieldName: 'answer_id' })
    answerId!: number;

    @ManyToOne(() => Question, { fieldName: 'question_id', referenceColumnName: 'question_id' })
    question!: Question;

    @ManyToOne(() => Student, { fieldName: 'student_id', referenceColumnName: 'student_id' })
    student!: Student;

    @Property({ fieldName: 'boolean_value', nullable: true })
    booleanValue?: boolean;

    @Property({ fieldName: 'numeric_value', type: 'decimal', precision: 5, scale: 2, nullable: true })
    numericValue?: number;

    @Property({ fieldName: 'text_value', type: 'text', nullable: true })
    textValue?: string;

    @Property({ fieldName: 'answer_date', defaultRaw: 'CURRENT_TIMESTAMP' })
    answerDate: Date = new Date();

    constructor(question: Question, student: Student) {
        this.question = question;
        this.student = student;
    }
}
