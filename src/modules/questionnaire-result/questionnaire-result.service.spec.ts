import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnaireResultService } from './questionnaire-result.service';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { QuestionnaireResult } from './entities/questionnaire-result.entity';

describe('QuestionnaireResultService', () => {
  let service: QuestionnaireResultService;
  let mockRepo: Partial<EntityRepository<QuestionnaireResult>>;
  let mockEm: Partial<EntityManager>;

  const resultMock = {
    result_id: 1,
    questionnaire_id: 1,
    student_id: 10,
    application_date: new Date('2025-06-08'),
    total_score: 85,
    risk_level: 'Bajo',
    observations: 'Sin observaciones',
  } as QuestionnaireResult;

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn().mockReturnValue(resultMock),
      findAll: jest.fn().mockResolvedValue([resultMock]),
      findOne: jest.fn().mockResolvedValue(resultMock),
      assign: jest.fn(),
    };
    mockEm = {
      persistAndFlush: jest.fn(),
      flush: jest.fn(),
      removeAndFlush: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionnaireResultService,
        { provide: getRepositoryToken(QuestionnaireResult), useValue: mockRepo },
        { provide: EntityManager, useValue: mockEm },
      ],
    }).compile();
    service = module.get<QuestionnaireResultService>(QuestionnaireResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a questionnaire result', async () => {
    const dto = { questionnaire_id: 1, student_id: 10, application_date: '2025-06-08' };
    const result = await service.create(dto as any);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(mockEm.persistAndFlush).toHaveBeenCalledWith(resultMock);
    expect(result).toEqual(resultMock);
  });

  it('should return all questionnaire results', async () => {
    const result = await service.findAll();
    expect(mockRepo.findAll).toHaveBeenCalled();
    expect(result).toEqual([resultMock]);
  });

  it('should return a questionnaire result by id', async () => {
    const result = await service.findOne(1);
    expect(mockRepo.findOne).toHaveBeenCalledWith({ result_id: 1 });
    expect(result).toEqual(resultMock);
  });

  it('should return null if result not found', async () => {
    (mockRepo.findOne as jest.Mock).mockResolvedValueOnce(null);
    const result = await service.findOne(999);
    expect(result).toBeNull();
  });

  it('should update a questionnaire result', async () => {
    const dto = { total_score: 90 };
    (mockRepo.findOne as jest.Mock).mockResolvedValueOnce(resultMock);
    const result = await service.update(1, dto as any);
    expect(mockRepo.assign).toHaveBeenCalledWith(resultMock, dto);
    expect(mockEm.flush).toHaveBeenCalled();
    expect(result).toEqual(resultMock);
  });

  it('should return null if update not found', async () => {
    (mockRepo.findOne as jest.Mock).mockResolvedValueOnce(null);
    const result = await service.update(999, { total_score: 0 } as any);
    expect(result).toBeNull();
  });

  it('should remove a questionnaire result', async () => {
    (mockRepo.findOne as jest.Mock).mockResolvedValueOnce(resultMock);
    const result = await service.remove(1);
    expect(mockEm.removeAndFlush).toHaveBeenCalledWith(resultMock);
    expect(result).toBe(true);
  });

  it('should return false if remove not found', async () => {
    (mockRepo.findOne as jest.Mock).mockResolvedValueOnce(null);
    const result = await service.remove(999);
    expect(result).toBe(false);
  });
});
