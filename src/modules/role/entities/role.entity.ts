import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'roles' })
export class Role {
    @PrimaryKey()
    role_id?: number;

    @Property()
    role_name!: string;

    @Property({ nullable: true })
    description?: string;
}
