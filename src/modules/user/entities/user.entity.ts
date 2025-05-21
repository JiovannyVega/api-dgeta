import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
    @PrimaryKey()
    user_id?: number;

    @Property()
    role_id!: number;

    @Property()
    @Unique()
    username!: string;

    @Property()
    password_hash!: string;

    @Property()
    @Unique()
    email!: string;

    @Property({ onCreate: () => new Date() })
    registration_date?: Date;

    @Property({ nullable: true })
    last_login?: Date;

    @Property({ default: true })
    active: boolean = true;
}
