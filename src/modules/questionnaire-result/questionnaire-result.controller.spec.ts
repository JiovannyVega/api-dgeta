import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnaireResultController } from './questionnaire-result.controller';
import { QuestionnaireResultService } from './questionnaire-result.service';
import { CreateQuestionnaireResultDto } from './dto/create-questionnaire-result.dto';
import { UpdateQuestionnaireResultDto } from './dto/update-questionnaire-result.dto';

describe('QuestionnaireResultController', () => {
  let controller: QuestionnaireResultController;
  let service: jest.Mocked<QuestionnaireResultService>;

  const resultMock = {
    result_id: 1,
    questionnaire_id: 1,
    student_id: 10,
    application_date: new Date('2025-06-08'),
    total_score: 85,
    risk_level: 'Bajo',
    observations: 'Sin observaciones',
  };

  beforeEach(async () => {
    const mockService: Partial<jest.Mocked<QuestionnaireResultService>> = {
      create: jest.fn().mockResolvedValue(resultMock),
      findAll: jest.fn().mockResolvedValue([resultMock]),
      findOne: jest.fn().mockResolvedValue(resultMock),
      update: jest.fn().mockResolvedValue({ ...resultMock, total_score: 90 }),
      remove: jest.fn().mockResolvedValue(true),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnaireResultController],
      providers: [
        { provide: QuestionnaireResultService, useValue: mockService },
      ],
    }).compile();
    controller = module.get<QuestionnaireResultController>(QuestionnaireResultController);
    service = module.get(QuestionnaireResultService) as jest.Mocked<QuestionnaireResultService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a questionnaire result', async () => {
    const dto: CreateQuestionnaireResultDto = {
      questionnaire_id: 1,
      student_id: 10,
      application_date: '2025-06-08',
      total_score: 85,
      risk_level: 'Bajo',
      observations: 'Sin observaciones',
    };
    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(resultMock);
  });

  it('should return all questionnaire results', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([resultMock]);
  });

  it('should return a questionnaire result by id', async () => {
    const result = await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(resultMock);
  });

  it('should throw NotFoundException if result not found', async () => {
    service.findOne.mockResolvedValueOnce(null);
    await expect(controller.findOne('999')).rejects.toThrow('QuestionnaireResult #999 not found');
  });

  it('should update a questionnaire result', async () => {
    const dto: UpdateQuestionnaireResultDto = { total_score: 90 };
    const result = await controller.update('1', dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ ...resultMock, total_score: 90 });
  });

  it('should throw NotFoundException if update not found', async () => {
    service.update.mockResolvedValueOnce(null);
    await expect(controller.update('999', { total_score: 0 })).rejects.toThrow('QuestionnaireResult #999 not found');
  });

  it('should remove a questionnaire result', async () => {
    const result = await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException if remove not found', async () => {
    service.remove.mockResolvedValueOnce(false);
    await expect(controller.remove('999')).rejects.toThrow('QuestionnaireResult #999 not found');
  });
});
