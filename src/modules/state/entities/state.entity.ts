import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Municipality } from '../../municipality/entities/municipality.entity';

@Entity({ tableName: 'states' })
export class State {
    @PrimaryKey({ fieldName: 'state_id' })
    stateId!: number;

    @Property({ fieldName: 'name', length: 100 })
    name!: string;

    @Property({ fieldName: 'code', length: 10, nullable: true })
    code?: string;

    @OneToMany(() => Municipality, municipality => municipality.state)
    municipalities = new Collection<Municipality>(this);

    constructor(name: string, code?: string) {
        this.name = name;
        this.code = code;
    }
}
