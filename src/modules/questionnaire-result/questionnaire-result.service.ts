import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { QuestionnaireResult } from './entities/questionnaire-result.entity';
import { CreateQuestionnaireResultDto } from './dto/create-questionnaire-result.dto';
import { UpdateQuestionnaireResultDto } from './dto/update-questionnaire-result.dto';

@Injectable()
export class QuestionnaireResultService {
  constructor(
    @InjectRepository(QuestionnaireResult)
    private readonly questionnaireResultRepo: EntityRepository<QuestionnaireResult>,
    private readonly em: EntityManager,
  ) { }

  async create(createQuestionnaireResultDto: CreateQuestionnaireResultDto): Promise<QuestionnaireResult> {
    const entity = this.questionnaireResultRepo.create(createQuestionnaireResultDto);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<QuestionnaireResult[]> {
    return this.questionnaireResultRepo.findAll();
  }

  async findOne(id: number): Promise<QuestionnaireResult | null> {
    return this.questionnaireResultRepo.findOne({ result_id: id }) || null;
  }

  async update(id: number, updateQuestionnaireResultDto: UpdateQuestionnaireResultDto): Promise<QuestionnaireResult | null> {
    const entity = await this.findOne(id);
    if (!entity) return null;
    this.questionnaireResultRepo.assign(entity, updateQuestionnaireResultDto);
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
