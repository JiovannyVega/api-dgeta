import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { Questionnaire } from '../../questionnaire/entities/questionnaire.entity';
import { AnswerType } from './answer-type.enum';

@Entity({ tableName: 'questions' })
export class Question {
    @PrimaryKey({ fieldName: 'question_id' })
    questionId!: number;
    @ManyToOne(() => Questionnaire, { fieldName: 'questionnaire_id', referenceColumnName: 'questionnaire_id' })
    questionnaire!: Questionnaire;

    @Property({ fieldName: 'question_text', type: 'text' })
    questionText!: string;

    @Enum(() => AnswerType)
    @Property({ fieldName: 'answer_type' })
    answerType!: AnswerType;

    @Property({ fieldName: 'is_risk', type: 'boolean', default: false })
    isRisk: boolean = false;

    @Property({ fieldName: 'order' })
    order!: number;

    constructor(
        questionnaire: Questionnaire,
        questionText: string,
        answerType: AnswerType,
        order: number,
        isRisk: boolean = false
    ) {
        this.questionnaire = questionnaire;
        this.questionText = questionText;
        this.answerType = answerType;
        this.order = order;
        this.isRisk = isRisk;
    }
}
