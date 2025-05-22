import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'family_members' })
export class FamilyMember {
    @PrimaryKey()
    family_member_id?: number;

    @Property()
    student_id!: number;

    @Property()
    name!: string;

    @Property()
    relationship!: string;

    @Property({ nullable: true })
    phone?: string;

    @Property({ nullable: true })
    email?: string;

    @Property({ nullable: true })
    address?: string;

    @Property({ default: false })
    is_guardian?: boolean;

    @Property({ default: true })
    lives_with_student?: boolean;
}
