import { Test, TestingModule } from '@nestjs/testing';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { NotFoundException } from '@nestjs/common';

const mockSubject = {
  subject_id: 1,
  subject_name: 'Matemáticas I',
  subject_code: 'MAT101',
  semester: 1,
  theory_hours: 3,
  practice_hours: 2,
  specialty_id: 1,
};

const mockSubjectService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('SubjectController', () => {
  let controller: SubjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectController],
      providers: [
        { provide: SubjectService, useValue: mockSubjectService },
      ],
    }).compile();

    controller = module.get<SubjectController>(SubjectController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a subject', async () => {
    mockSubjectService.create.mockResolvedValueOnce(mockSubject);
    const dto = {
      subject_name: 'Matemáticas I',
      subject_code: 'MAT101',
      semester: 1,
      theory_hours: 3,
      practice_hours: 2,
      specialty_id: 1,
    };
    const result = await controller.create(dto as any);
    expect(result).toEqual(mockSubject);
  });

  it('should return all subjects', async () => {
    mockSubjectService.findAll.mockResolvedValueOnce([mockSubject]);
    const result = await controller.findAll();
    expect(result).toEqual([mockSubject]);
  });

  it('should return one subject', async () => {
    mockSubjectService.findOne.mockResolvedValueOnce(mockSubject);
    const result = await controller.findOne('1');
    expect(result).toEqual(mockSubject);
  });

  it('should throw NotFoundException if subject not found', async () => {
    mockSubjectService.findOne.mockResolvedValueOnce(null);
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should update a subject', async () => {
    mockSubjectService.update.mockResolvedValueOnce(mockSubject);
    const dto = { subject_name: 'Matemáticas II' };
    const result = await controller.update('1', dto as any);
    expect(result).toEqual(mockSubject);
  });

  it('should throw NotFoundException if update not found', async () => {
    mockSubjectService.update.mockResolvedValueOnce(null);
    await expect(controller.update('999', { subject_name: 'X' } as any)).rejects.toThrow(NotFoundException);
  });

  it('should remove a subject', async () => {
    mockSubjectService.remove.mockResolvedValueOnce(true);
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException if remove not found', async () => {
    mockSubjectService.remove.mockResolvedValueOnce(false);
    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });
});
