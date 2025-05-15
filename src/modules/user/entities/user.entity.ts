import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    email!: string;

    @Property()
    createdAt: Date = new Date();
}
