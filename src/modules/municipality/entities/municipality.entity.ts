import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { State } from '../../state/entities/state.entity';

@Entity({ tableName: 'municipalities' })
export class Municipality {
    @PrimaryKey({ fieldName: 'municipality_id' })
    municipalityId!: number;

    @Property({ fieldName: 'name', length: 100 })
    name!: string;

    @ManyToOne(() => State, { fieldName: 'state_id' })
    state!: State;

    constructor(name: string, state: State) {
        this.name = name;
        this.state = state;
    }
}
