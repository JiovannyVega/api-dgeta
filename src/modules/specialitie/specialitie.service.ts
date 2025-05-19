import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { CreateSpecialitieDto } from './dto/create-specialitie.dto';
import { UpdateSpecialitieDto } from './dto/update-specialitie.dto';
import { Specialitie } from './entities/specialitie.entity';

@Injectable()
export class SpecialitieService {
  constructor(
    @InjectRepository(Specialitie)
    private readonly specialitieRepo: EntityRepository<Specialitie>,
    private readonly em: EntityManager,
  ) { }

  async create(createDto: CreateSpecialitieDto): Promise<Specialitie> {
    const entity = this.specialitieRepo.create(createDto);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<Specialitie[]> {
    return this.specialitieRepo.findAll();
  }

  async findOne(id: number): Promise<Specialitie | null> {
    return this.specialitieRepo.findOne({ specialty_id: id });
  }

  async findByCode(specialty_code: string): Promise<Specialitie | null> {
    return this.specialitieRepo.findOne({ specialty_code });
  }

  async update(id: number, updateDto: UpdateSpecialitieDto): Promise<Specialitie | null> {
    const entity = await this.specialitieRepo.findOne({ specialty_id: id });
    if (!entity) return null;
    this.specialitieRepo.assign(entity, updateDto);
    await this.em.flush();
    return entity;
  }

  async remove(id: number): Promise<boolean> {
    const entity = await this.specialitieRepo.findOne({ specialty_id: id });
    if (!entity) return false;
    await this.em.removeAndFlush(entity);
    return true;
  }
}
