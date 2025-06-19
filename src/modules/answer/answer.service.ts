import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/mysql';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { QuestionService } from '../question/question.service';
import { StudentService } from '../student/student.service';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private readonly answerRepository: EntityRepository<Answer>,
        private readonly em: EntityManager,
        private readonly questionService: QuestionService,
        private readonly studentService: StudentService,
    ) { }

    async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
        const question = await this.questionService.findOne(createAnswerDto.questionId);
        const student = await this.studentService.findOne(createAnswerDto.studentId);

        const answer = new Answer(question, student);

        if (createAnswerDto.booleanValue !== undefined) {
            answer.booleanValue = createAnswerDto.booleanValue;
        }

        if (createAnswerDto.numericValue !== undefined) {
            answer.numericValue = createAnswerDto.numericValue;
        }

        if (createAnswerDto.textValue !== undefined) {
            answer.textValue = createAnswerDto.textValue;
        }

        await this.em.persistAndFlush(answer);
        return answer;
    }

    async findAll(): Promise<Answer[]> {
        return this.answerRepository.findAll({
            populate: ['question', 'student', 'question.questionnaire']
        });
    }

    async findOne(id: number): Promise<Answer> {
        const answer = await this.answerRepository.findOne(
            { answerId: id },
            { populate: ['question', 'student', 'question.questionnaire'] }
        );
        if (!answer) {
            throw new NotFoundException(`Answer with ID ${id} not found`);
        }
        return answer;
    }

    async findByQuestionId(questionId: number): Promise<Answer[]> {
        return this.answerRepository.find(
            { question: { questionId } },
            { populate: ['question', 'student', 'question.questionnaire'] }
        );
    }

    async findByStudentId(studentId: number): Promise<Answer[]> {
        return this.answerRepository.find(
            { student: { student_id: studentId } },
            { populate: ['question', 'student', 'question.questionnaire'] }
        );
    }

    async findByStudentAndQuestionnaire(studentId: number, questionnaireId: number): Promise<Answer[]> {
        return this.answerRepository.find(
            {
                student: { student_id: studentId },
                question: { questionnaire: { questionnaire_id: questionnaireId } }
            },
            { populate: ['question', 'student', 'question.questionnaire'] }
        );
    }

    async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
        const answer = await this.findOne(id);

        if (updateAnswerDto.booleanValue !== undefined) {
            answer.booleanValue = updateAnswerDto.booleanValue;
        }

        if (updateAnswerDto.numericValue !== undefined) {
            answer.numericValue = updateAnswerDto.numericValue;
        }

        if (updateAnswerDto.textValue !== undefined) {
            answer.textValue = updateAnswerDto.textValue;
        }

        if (updateAnswerDto.questionId) {
            const question = await this.questionService.findOne(updateAnswerDto.questionId);
            answer.question = question;
        }

        if (updateAnswerDto.studentId) {
            const student = await this.studentService.findOne(updateAnswerDto.studentId);
            answer.student = student;
        }

        await this.em.flush();
        return answer;
    }

    async remove(id: number): Promise<void> {
        const answer = await this.findOne(id);
        await this.em.removeAndFlush(answer);
    }
}
