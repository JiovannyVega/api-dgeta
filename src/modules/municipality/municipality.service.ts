import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/mysql';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { Municipality } from './entities/municipality.entity';
import { StateService } from '../state/state.service';

@Injectable()
export class MunicipalityService {
    constructor(
        @InjectRepository(Municipality)
        private readonly municipalityRepository: EntityRepository<Municipality>,
        private readonly em: EntityManager,
        private readonly stateService: StateService,
    ) { }

    async create(createMunicipalityDto: CreateMunicipalityDto): Promise<Municipality> {
        const state = await this.stateService.findOne(createMunicipalityDto.stateId);
        const municipality = new Municipality(createMunicipalityDto.name, state);
        await this.em.persistAndFlush(municipality);
        return municipality;
    }

    async findAll(): Promise<Municipality[]> {
        return this.municipalityRepository.findAll({ populate: ['state'] });
    }

    async findOne(id: number): Promise<Municipality> {
        const municipality = await this.municipalityRepository.findOne(
            { municipalityId: id },
            { populate: ['state'] }
        );
        if (!municipality) {
            throw new NotFoundException(`Municipality with ID ${id} not found`);
        }
        return municipality;
    }

    async findByStateId(stateId: number): Promise<Municipality[]> {
        return this.municipalityRepository.find(
            { state: { stateId } },
            { populate: ['state'] }
        );
    }

    async update(id: number, updateMunicipalityDto: UpdateMunicipalityDto): Promise<Municipality> {
        const municipality = await this.findOne(id);

        if (updateMunicipalityDto.name) {
            municipality.name = updateMunicipalityDto.name;
        }

        if (updateMunicipalityDto.stateId) {
            const state = await this.stateService.findOne(updateMunicipalityDto.stateId);
            municipality.state = state;
        }

        await this.em.flush();
        return municipality;
    }

    async remove(id: number): Promise<void> {
        const municipality = await this.findOne(id);
        await this.em.removeAndFlush(municipality);
    }
}
