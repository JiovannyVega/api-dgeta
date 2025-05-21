import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { Specialty } from '../specialty/entities/specialty.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepo: EntityRepository<Group>,
    @InjectRepository(Specialty)
    private readonly specialitieRepo: EntityRepository<Specialty>,
    private readonly em: EntityManager,
  ) { }

  async create(createDto: CreateGroupDto): Promise<Group> {
    const entity = this.groupRepo.create(createDto);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<any[]> {
    const groups = await this.groupRepo.findAll();
    const result: any[] = [];
    for (const group of groups) {
      const specialty = await this.specialitieRepo.findOne({ specialty_id: group.specialty_id });
      result.push({
        group_id: group.group_id,
        group_name: group.group_name,
        shift: group.shift,
        semester: group.semester,
        specialty_id: group.specialty_id,
        specialty,
      });
    }
    return result;
  }

  async findOne(id: number): Promise<any | null> {
    const group = await this.groupRepo.findOne({ group_id: id });
    if (!group) return null;
    const specialty = await this.specialitieRepo.findOne({ specialty_id: group.specialty_id });
    return {
      group_id: group.group_id,
      group_name: group.group_name,
      shift: group.shift,
      semester: group.semester,
      specialty_id: group.specialty_id,
      specialty,
    };
  }

  async update(id: number, updateDto: UpdateGroupDto): Promise<Group | null> {
    const entity = await this.groupRepo.findOne({ group_id: id });
    if (!entity) return null;
    this.groupRepo.assign(entity, updateDto);
    await this.em.flush();
    return entity;
  }

  async remove(id: number): Promise<boolean> {
    const entity = await this.groupRepo.findOne({ group_id: id });
    if (!entity) return false;
    await this.em.removeAndFlush(entity);
    return true;
  }
}
