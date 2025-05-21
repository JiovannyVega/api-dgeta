import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ShiftEnum } from '../dto/create-group.dto';

@Entity({ tableName: 'groups' })
export class Group {
    @PrimaryKey()
    group_id?: number;

    @Property()
    group_name!: string;

    @Property({ type: 'string' })
    shift!: ShiftEnum;

    @Property()
    semester!: number;

    @Property()
    specialty_id!: number;
}
