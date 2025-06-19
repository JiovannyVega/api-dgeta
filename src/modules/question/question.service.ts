import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/mysql';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: EntityRepository<Question>,
        private readonly em: EntityManager,
        private readonly questionnaireService: QuestionnaireService,
    ) { }
    async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const questionnaire = await this.questionnaireService.findOne(createQuestionDto.questionnaireId);
        if (!questionnaire) {
            throw new NotFoundException(`Questionnaire with ID ${createQuestionDto.questionnaireId} not found`);
        }

        const question = new Question(
            questionnaire,
            createQuestionDto.questionText,
            createQuestionDto.answerType,
            createQuestionDto.order,
            createQuestionDto.isRisk
        );

        await this.em.persistAndFlush(question);
        return question;
    }

    async findAll(): Promise<Question[]> {
        return this.questionRepository.findAll({ populate: ['questionnaire'] });
    }

    async findOne(id: number): Promise<Question> {
        const question = await this.questionRepository.findOne(
            { questionId: id },
            { populate: ['questionnaire'] }
        );
        if (!question) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }
        return question;
    }
    async findByQuestionnaireId(questionnaireId: number): Promise<Question[]> {
        return this.questionRepository.find(
            { questionnaire: { questionnaire_id: questionnaireId } },
            { populate: ['questionnaire'], orderBy: { order: 'ASC' } }
        );
    }

    async findRiskQuestions(questionnaireId?: number): Promise<Question[]> {
        const where: any = { isRisk: true };
        if (questionnaireId) {
            where.questionnaire = { questionnaire_id: questionnaireId };
        }

        return this.questionRepository.find(where, {
            populate: ['questionnaire'],
            orderBy: { order: 'ASC' }
        });
    }

    async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
        const question = await this.findOne(id);

        if (updateQuestionDto.questionText) {
            question.questionText = updateQuestionDto.questionText;
        }

        if (updateQuestionDto.answerType) {
            question.answerType = updateQuestionDto.answerType;
        }

        if (updateQuestionDto.order !== undefined) {
            question.order = updateQuestionDto.order;
        }

        if (updateQuestionDto.isRisk !== undefined) {
            question.isRisk = updateQuestionDto.isRisk;
        }
        if (updateQuestionDto.questionnaireId) {
            const questionnaire = await this.questionnaireService.findOne(updateQuestionDto.questionnaireId);
            if (!questionnaire) {
                throw new NotFoundException(`Questionnaire with ID ${updateQuestionDto.questionnaireId} not found`);
            }
            question.questionnaire = questionnaire;
        }

        await this.em.flush();
        return question;
    }

    async remove(id: number): Promise<void> {
        const question = await this.findOne(id);
        await this.em.removeAndFlush(question);
    }
}
