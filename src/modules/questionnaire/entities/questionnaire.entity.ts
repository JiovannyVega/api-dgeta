import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'questionnaires' })
export class Questionnaire {
    @PrimaryKey()
    questionnaire_id?: number;

    @Property()
    name!: string;

    @Property({ nullable: true })
    description?: string;

    @Property({ nullable: true })
    version?: string;

    @Property({ nullable: true })
    creation_date?: Date;
}
