import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnaireService } from './questionnaire.service';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { getRepositoryToken, MikroOrmModule } from '@mikro-orm/nestjs';
import { Questionnaire } from './entities/questionnaire.entity';

describe('QuestionnaireService', () => {
  let service: QuestionnaireService;
  let mockRepo: Partial<EntityRepository<Questionnaire>>;
  let mockEm: Partial<EntityManager>;

  const questionnaireMock = {
    questionnaire_id: 1,
    name: 'Test Q',
    description: 'Desc',
    version: '1.0',
    creation_date: new Date('2025-06-08'),
  } as Questionnaire;

  beforeEach(async () => {
    mockRepo = {
      create: jest.fn().mockReturnValue(questionnaireMock),
      findAll: jest.fn().mockResolvedValue([questionnaireMock]),
      findOne: jest.fn().mockResolvedValue(questionnaireMock),
      assign: jest.fn(),
    };
    mockEm = {
      persistAndFlush: jest.fn(),
      flush: jest.fn(),
      removeAndFlush: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionnaireService,
        { provide: getRepositoryToken(Questionnaire), useValue: mockRepo },
        { provide: EntityManager, useValue: mockEm },
      ],
    }).compile();
    service = module.get<QuestionnaireService>(QuestionnaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a questionnaire', async () => {
    const dto = { name: 'Test Q' };
    const result = await service.create(dto as any);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(mockEm.persistAndFlush).toHaveBeenCalledWith(questionnaireMock);
    expect(result).toEqual(questionnaireMock);
  });

  it('should return all questionnaires', async () => {
    const result = await service.findAll();
    expect(mockRepo.findAll).toHaveBeenCalled();
    expect(result).toEqual([questionnaireMock]);
  });

  it('should return a questionnaire by id', async () => {
    const result = await service.findOne(1);
    expect(mockRepo.findOne).toHaveBeenCalledWith({ questionnaire_id: 1 });
    expect(result).toEqual(questionnaireMock);
  });

  it('should return null if questionnaire not found', async () => {
    (mockRepo.findOne as jest.Mock).mockResolvedValueOnce(null);
    const result = await service.findOne(999);
    expect(result).toBeNull();
  });

  it('should update a questionnaire', async () => {
    const dto = { name: 'Updated' };
    (mockRepo.findOne as jest.Mock).mockResolvedValueOnce(questionnaireMock);
    const result = await service.update(1, dto as any);
    expect(mockRepo.assign).toHaveBeenCalledWith(questionnaireMock, dto);
    expect(mockEm.flush).toHaveBeenCalled();
    expect(result).toEqual(questionnaireMock);
  });

  it('should return null if update not found', async () => {
    (mockRepo.findOne as jest.Mock).mockResolvedValueOnce(null);
    const result = await service.update(999, { name: 'X' } as any);
    expect(result).toBeNull();
  });

  it('should remove a questionnaire', async () => {
    (mockRepo.findOne as jest.Mock).mockResolvedValueOnce(questionnaireMock);
    const result = await service.remove(1);
    expect(mockEm.removeAndFlush).toHaveBeenCalledWith(questionnaireMock);
    expect(result).toBe(true);
  });

  it('should return false if remove not found', async () => {
    (mockRepo.findOne as jest.Mock).mockResolvedValueOnce(null);
    const result = await service.remove(999);
    expect(result).toBe(false);
  });
});
