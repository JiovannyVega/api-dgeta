import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { AnswerType } from './entities/answer-type.enum';
import { Questionnaire } from '../questionnaire/entities/questionnaire.entity';

describe('QuestionController', () => {
    let controller: QuestionController;
    let service: QuestionService;

    const mockQuestionnaire: Questionnaire = {
        questionnaire_id: 1,
        name: 'Test Questionnaire',
        description: 'Test Description',
    } as Questionnaire;

    const mockQuestion: Question = {
        questionId: 1,
        questionnaire: mockQuestionnaire,
        questionText: 'Test Question',
        answerType: AnswerType.BOOLEAN,
        order: 1,
        isRisk: false,
    } as Question;

    const mockQuestionService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        findByQuestionnaireId: jest.fn(),
        findRiskQuestions: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QuestionController],
            providers: [
                {
                    provide: QuestionService,
                    useValue: mockQuestionService,
                },
            ],
        }).compile();

        controller = module.get<QuestionController>(QuestionController);
        service = module.get<QuestionService>(QuestionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a question', async () => {
            const createQuestionDto: CreateQuestionDto = {
                questionnaireId: 1,
                questionText: 'Test Question',
                answerType: AnswerType.BOOLEAN,
                order: 1,
                isRisk: false,
            };

            mockQuestionService.create.mockResolvedValue(mockQuestion);

            const result = await controller.create(createQuestionDto);

            expect(service.create).toHaveBeenCalledWith(createQuestionDto);
            expect(result).toEqual(mockQuestion);
        });
    });

    describe('findAll', () => {
        it('should return all questions', async () => {
            const mockQuestions = [mockQuestion];
            mockQuestionService.findAll.mockResolvedValue(mockQuestions);

            const result = await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockQuestions);
        });

        it('should return questions by questionnaire when questionnaire param is provided', async () => {
            const mockQuestions = [mockQuestion];
            mockQuestionService.findByQuestionnaireId.mockResolvedValue(mockQuestions);

            const result = await controller.findAll('1');

            expect(service.findByQuestionnaireId).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockQuestions);
        });
    });

    describe('findRiskQuestions', () => {
        it('should return risk questions', async () => {
            const mockRiskQuestions = [{ ...mockQuestion, isRisk: true }];
            mockQuestionService.findRiskQuestions.mockResolvedValue(mockRiskQuestions);

            const result = await controller.findRiskQuestions();

            expect(service.findRiskQuestions).toHaveBeenCalledWith(undefined);
            expect(result).toEqual(mockRiskQuestions);
        });

        it('should return risk questions for specific questionnaire', async () => {
            const mockRiskQuestions = [{ ...mockQuestion, isRisk: true }];
            mockQuestionService.findRiskQuestions.mockResolvedValue(mockRiskQuestions);

            const result = await controller.findRiskQuestions('1');

            expect(service.findRiskQuestions).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockRiskQuestions);
        });
    });

    describe('findOne', () => {
        it('should return a question by id', async () => {
            mockQuestionService.findOne.mockResolvedValue(mockQuestion);

            const result = await controller.findOne('1');

            expect(service.findOne).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockQuestion);
        });
    });

    describe('findByQuestionnaireId', () => {
        it('should return questions by questionnaire id', async () => {
            const mockQuestions = [mockQuestion];
            mockQuestionService.findByQuestionnaireId.mockResolvedValue(mockQuestions);

            const result = await controller.findByQuestionnaireId('1');

            expect(service.findByQuestionnaireId).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockQuestions);
        });
    });

    describe('update', () => {
        it('should update a question', async () => {
            const updateQuestionDto: UpdateQuestionDto = {
                questionText: 'Updated Question',
            };

            const updatedQuestion = { ...mockQuestion, ...updateQuestionDto };
            mockQuestionService.update.mockResolvedValue(updatedQuestion);

            const result = await controller.update('1', updateQuestionDto);

            expect(service.update).toHaveBeenCalledWith(1, updateQuestionDto);
            expect(result).toEqual(updatedQuestion);
        });
    });

    describe('remove', () => {
        it('should remove a question', async () => {
            mockQuestionService.remove.mockResolvedValue(undefined);

            const result = await controller.remove('1');

            expect(service.remove).toHaveBeenCalledWith(1);
            expect(result).toEqual({ deleted: true });
        });
    });
});
