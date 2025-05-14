import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'roles' })
export class Role {
    @PrimaryKey({ name: 'role_id' })
    role_id?: number;

    @Property({ name: 'role_name' })
    role_name!: string;

    @Property({ nullable: true })
    description?: string;
}
