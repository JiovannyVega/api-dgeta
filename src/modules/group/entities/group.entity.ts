import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'groups' })
export class Group {
    @PrimaryKey()
    group_id?: number;

    @Property()
    group_name!: string;

    @Property()
    shift!: string;

    @Property()
    semester!: number;

    @Property()
    specialty_id!: number;
}
