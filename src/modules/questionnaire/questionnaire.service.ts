import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { Questionnaire } from './entities/questionnaire.entity';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepo: EntityRepository<Questionnaire>,
    private readonly em: EntityManager,
  ) { }

  async create(createQuestionnaireDto: CreateQuestionnaireDto): Promise<Questionnaire> {
    const entity = this.questionnaireRepo.create(createQuestionnaireDto);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<Questionnaire[]> {
    return this.questionnaireRepo.findAll();
  }

  async findOne(id: number): Promise<Questionnaire | null> {
    return this.questionnaireRepo.findOne({ questionnaire_id: id }) || null;
  }

  async update(id: number, updateQuestionnaireDto: UpdateQuestionnaireDto): Promise<Questionnaire | null> {
    const entity = await this.findOne(id);
    if (!entity) return null;
    this.questionnaireRepo.assign(entity, updateQuestionnaireDto);
    await this.em.flush();
    return entity;
  }

  async remove(id: number): Promise<boolean> {
    const entity = await this.findOne(id);
    if (!entity) return false;
    await this.em.removeAndFlush(entity);
    return true;
  }
}
