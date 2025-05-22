import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepo: EntityRepository<Subject>,
    private readonly em: EntityManager,
  ) { }

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const entity = this.subjectRepo.create(createSubjectDto);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectRepo.findAll();
  }

  async findOne(id: number): Promise<Subject | null> {
    return this.subjectRepo.findOne({ subject_id: id }) || null;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject | null> {
    const entity = await this.subjectRepo.findOne({ subject_id: id });
    if (!entity) return null;
    this.subjectRepo.assign(entity, updateSubjectDto);
    await this.em.flush();
    return entity;
  }

  async remove(id: number): Promise<boolean> {
    const entity = await this.subjectRepo.findOne({ subject_id: id });
    if (!entity) return false;
    await this.em.removeAndFlush(entity);
    return true;
  }
}
