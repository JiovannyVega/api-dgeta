import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from './subject.service';
import { EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Subject } from './entities/subject.entity';

const mockSubject: Subject = {
  subject_id: 1,
  subject_name: 'Matemáticas I',
  subject_code: 'MAT101',
  semester: 1,
  theory_hours: 3,
  practice_hours: 2,
  specialty_id: 1,
};

const mockSubjectRepo = {
  create: jest.fn().mockReturnValue(mockSubject),
  findAll: jest.fn().mockResolvedValue([mockSubject]),
  findOne: jest.fn().mockResolvedValue(mockSubject),
  assign: jest.fn(),
  persistAndFlush: jest.fn(),
  removeAndFlush: jest.fn(),
};
const mockEm = {
  persistAndFlush: jest.fn(),
  flush: jest.fn(),
  removeAndFlush: jest.fn(),
};

describe('SubjectService', () => {
  let service: SubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        { provide: getRepositoryToken('Subject'), useValue: mockSubjectRepo },
        { provide: EntityManager, useValue: mockEm },
      ],
    }).compile();

    service = module.get<SubjectService>(SubjectService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a subject', async () => {
    mockEm.persistAndFlush.mockResolvedValueOnce(undefined);
    const dto = {
      subject_name: 'Matemáticas I',
      subject_code: 'MAT101',
      semester: 1,
      theory_hours: 3,
      practice_hours: 2,
      specialty_id: 1,
    };
    const result = await service.create(dto);
    expect(result).toEqual(mockSubject);
    expect(mockSubjectRepo.create).toHaveBeenCalledWith(dto);
    expect(mockEm.persistAndFlush).toHaveBeenCalledWith(mockSubject);
  });

  it('should return all subjects', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockSubject]);
    expect(mockSubjectRepo.findAll).toHaveBeenCalled();
  });

  it('should return one subject', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockSubject);
    expect(mockSubjectRepo.findOne).toHaveBeenCalledWith({ subject_id: 1 });
  });

  it('should return null if subject not found', async () => {
    mockSubjectRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.findOne(999);
    expect(result).toBeNull();
  });

  it('should update a subject', async () => {
    mockEm.flush.mockResolvedValueOnce(undefined);
    const dto = { subject_name: 'Matemáticas II' };
    const result = await service.update(1, dto as any);
    expect(result).toEqual(mockSubject);
    expect(mockSubjectRepo.assign).toHaveBeenCalledWith(mockSubject, dto);
    expect(mockEm.flush).toHaveBeenCalled();
  });

  it('should return null when updating non-existent subject', async () => {
    mockSubjectRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.update(999, { subject_name: 'X' } as any);
    expect(result).toBeNull();
  });

  it('should remove a subject', async () => {
    mockSubjectRepo.removeAndFlush.mockResolvedValueOnce(undefined);
    const result = await service.remove(1);
    expect(result).toBe(true);
    expect(mockEm.removeAndFlush).toHaveBeenCalledWith(mockSubject);
  });

  it('should return false when removing non-existent subject', async () => {
    mockSubjectRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.remove(999);
    expect(result).toBe(false);
  });
});
