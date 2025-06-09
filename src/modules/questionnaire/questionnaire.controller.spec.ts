import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';

describe('QuestionnaireController', () => {
  let controller: QuestionnaireController;
  let service: jest.Mocked<QuestionnaireService>;

  const questionnaireMock = {
    questionnaire_id: 1,
    name: 'Test Q',
    description: 'Desc',
    version: '1.0',
    creation_date: new Date('2025-06-08'),
  };

  beforeEach(async () => {
    const mockService: Partial<jest.Mocked<QuestionnaireService>> = {
      create: jest.fn().mockResolvedValue(questionnaireMock),
      findAll: jest.fn().mockResolvedValue([questionnaireMock]),
      findOne: jest.fn().mockResolvedValue(questionnaireMock),
      update: jest.fn().mockResolvedValue({ ...questionnaireMock, name: 'Updated' }),
      remove: jest.fn().mockResolvedValue(true),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnaireController],
      providers: [
        { provide: QuestionnaireService, useValue: mockService },
      ],
    }).compile();
    controller = module.get<QuestionnaireController>(QuestionnaireController);
    service = module.get(QuestionnaireService) as jest.Mocked<QuestionnaireService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a questionnaire', async () => {
    const dto: CreateQuestionnaireDto = { name: 'Test Q' };
    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(questionnaireMock);
  });

  it('should return all questionnaires', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([questionnaireMock]);
  });

  it('should return a questionnaire by id', async () => {
    const result = await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(questionnaireMock);
  });

  it('should throw NotFoundException if questionnaire not found', async () => {
    service.findOne.mockResolvedValueOnce(null);
    await expect(controller.findOne('999')).rejects.toThrow('Questionnaire #999 not found');
  });

  it('should update a questionnaire', async () => {
    const dto: UpdateQuestionnaireDto = { name: 'Updated' };
    const result = await controller.update('1', dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ ...questionnaireMock, name: 'Updated' });
  });

  it('should throw NotFoundException if update not found', async () => {
    service.update.mockResolvedValueOnce(null);
    await expect(controller.update('999', { name: 'X' })).rejects.toThrow('Questionnaire #999 not found');
  });

  it('should remove a questionnaire', async () => {
    const result = await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException if remove not found', async () => {
    service.remove.mockResolvedValueOnce(false);
    await expect(controller.remove('999')).rejects.toThrow('Questionnaire #999 not found');
  });
});
