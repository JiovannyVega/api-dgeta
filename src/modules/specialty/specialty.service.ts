import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { CreateSpecialitieDto } from './dto/create-specialty.dto';
import { UpdateSpecialitieDto } from './dto/update-specialty.dto';
import { Specialty } from './entities/specialty.entity';

@Injectable()
export class SpecialityService {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepo: EntityRepository<Specialty>,
    private readonly em: EntityManager,
  ) { }

  async create(createDto: CreateSpecialitieDto): Promise<Specialty> {
    const entity = this.specialtyRepo.create(createDto);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<Specialty[]> {
    return this.specialtyRepo.findAll();
  }

  async findOne(id: number): Promise<Specialty | null> {
    return this.specialtyRepo.findOne({ specialty_id: id });
  }

  async findByCode(specialty_code: string): Promise<Specialty | null> {
    return this.specialtyRepo.findOne({ specialty_code });
  }

  async update(id: number, updateDto: UpdateSpecialitieDto): Promise<Specialty | null> {
    const entity = await this.specialtyRepo.findOne({ specialty_id: id });
    if (!entity) return null;
    this.specialtyRepo.assign(entity, updateDto);
    await this.em.flush();
    return entity;
  }

  async remove(id: number): Promise<boolean> {
    const entity = await this.specialtyRepo.findOne({ specialty_id: id });
    if (!entity) return false;
    await this.em.removeAndFlush(entity);
    return true;
  }
}
