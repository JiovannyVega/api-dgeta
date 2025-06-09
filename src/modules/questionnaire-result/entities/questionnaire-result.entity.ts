import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'questionnaire_results' })
export class QuestionnaireResult {
    @PrimaryKey()
    result_id?: number;

    @Property()
    questionnaire_id!: number;

    @Property()
    student_id!: number;

    @Property()
    application_date!: Date;

    @Property({ nullable: true })
    total_score?: number;

    @Property({ nullable: true })
    risk_level?: string;

    @Property({ nullable: true })
    observations?: string;
}
