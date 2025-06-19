import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/mysql';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';

@Injectable()
export class StateService {
    constructor(
        @InjectRepository(State)
        private readonly stateRepository: EntityRepository<State>,
        private readonly em: EntityManager,
    ) { }

    async create(createStateDto: CreateStateDto): Promise<State> {
        const state = new State(createStateDto.name, createStateDto.code);
        await this.em.persistAndFlush(state);
        return state;
    }

    async findAll(): Promise<State[]> {
        return this.stateRepository.findAll();
    }

    async findOne(id: number): Promise<State> {
        const state = await this.stateRepository.findOne({ stateId: id });
        if (!state) {
            throw new NotFoundException(`State with ID ${id} not found`);
        }
        return state;
    }

    async findByCode(code: string): Promise<State | null> {
        return this.stateRepository.findOne({ code });
    }
    async update(id: number, updateStateDto: UpdateStateDto): Promise<State> {
        const state = await this.findOne(id);

        if (updateStateDto.name) state.name = updateStateDto.name;
        if (updateStateDto.code !== undefined) state.code = updateStateDto.code;

        await this.em.flush();
        return state;
    }

    async remove(id: number): Promise<void> {
        const state = await this.findOne(id);
        await this.em.removeAndFlush(state);
    }
}
