import { Test, TestingModule } from '@nestjs/testing';
import { GradeService } from './grade.service';
import { EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Grade } from './entities/grade.entity';
import { StudentService } from '../student/student.service';
import { GroupSubjectService } from '../group-subject/group-subject.service';

const mockGrade: Grade = {
  grade_id: 1,
  student_id: 2,
  group_subject_id: 3,
  partial_1: 8.5,
  partial_2: 9.0,
  partial_3: 7.5,
  final_grade: 8.3,
  update_date: new Date(),
};

const mockStudent = { student_id: 2, user_id: 10, control_number: 'A123', user: { user_id: 10, username: 'alumno' } };
const mockGroupSubject = { group_subject_id: 3, group_id: 4, subject_id: 5, teacher_id: 6, period: '2024-1' };

const mockGradeRepo = {
  create: jest.fn().mockReturnValue(mockGrade),
  findAll: jest.fn().mockResolvedValue([mockGrade]),
  findOne: jest.fn().mockResolvedValue(mockGrade),
  find: jest.fn().mockResolvedValue([mockGrade]),
  assign: jest.fn(),
  persistAndFlush: jest.fn(),
  removeAndFlush: jest.fn(),
};
const mockEm = {
  persistAndFlush: jest.fn(),
  flush: jest.fn(),
  removeAndFlush: jest.fn(),
};
const mockStudentService = {
  findOne: jest.fn().mockResolvedValue(mockStudent),
};
const mockGroupSubjectService = {
  findOne: jest.fn().mockResolvedValue(mockGroupSubject),
};

describe('GradeService', () => {
  let service: GradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GradeService,
        { provide: getRepositoryToken('Grade'), useValue: mockGradeRepo },
        { provide: EntityManager, useValue: mockEm },
        { provide: StudentService, useValue: mockStudentService },
        { provide: GroupSubjectService, useValue: mockGroupSubjectService },
      ],
    }).compile();

    service = module.get<GradeService>(GradeService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a grade', async () => {
    mockEm.persistAndFlush.mockResolvedValueOnce(undefined);
    const dto = { student_id: 2, group_subject_id: 3, partial_1: 8.5 };
    const result = await service.create(dto as any);
    expect(result).toEqual(mockGrade);
    expect(mockGradeRepo.create).toHaveBeenCalledWith(dto);
    expect(mockEm.persistAndFlush).toHaveBeenCalledWith(mockGrade);
  });

  it('should return all grades with student and groupSubject', async () => {
    const result = await service.findAll();
    expect(result[0].student).toEqual(mockStudent);
    expect(result[0].groupSubject).toEqual(mockGroupSubject);
  });

  it('should return one grade with student and groupSubject', async () => {
    const result = await service.findOne(1);
    expect(result.student).toEqual(mockStudent);
    expect(result.groupSubject).toEqual(mockGroupSubject);
  });

  it('should return null if grade not found', async () => {
    mockGradeRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.findOne(999);
    expect(result).toBeNull();
  });

  it('should return grades by student_id', async () => {
    mockGradeRepo.find.mockResolvedValueOnce([mockGrade]);
    const result = await service.findByStudentId(2);
    expect(result[0].student).toEqual(mockStudent);
    expect(result[0].groupSubject).toEqual(mockGroupSubject);
    expect(mockGradeRepo.find).toHaveBeenCalledWith({ student_id: 2 });
  });

  it('should return grades by group_subject_id', async () => {
    mockGradeRepo.find.mockResolvedValueOnce([mockGrade]);
    const result = await service.findByGroupSubjectId(3);
    expect(result[0].student).toEqual(mockStudent);
    expect(result[0].groupSubject).toEqual(mockGroupSubject);
    expect(mockGradeRepo.find).toHaveBeenCalledWith({ group_subject_id: 3 });
  });

  it('should update a grade', async () => {
    mockEm.flush.mockResolvedValueOnce(undefined);
    const result = await service.update(1, { partial_1: 9 } as any);
    expect(result).toEqual(mockGrade);
    expect(mockGradeRepo.assign).toHaveBeenCalledWith(mockGrade, { partial_1: 9 });
    expect(mockEm.flush).toHaveBeenCalled();
  });

  it('should return null when updating non-existent grade', async () => {
    mockGradeRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.update(999, { partial_1: 10 } as any);
    expect(result).toBeNull();
  });

  it('should remove a grade', async () => {
    mockGradeRepo.findOne.mockResolvedValueOnce(mockGrade);
    mockEm.removeAndFlush.mockResolvedValueOnce(undefined);
    const result = await service.remove(1);
    expect(result).toBe(true);
    expect(mockEm.removeAndFlush).toHaveBeenCalledWith(mockGrade);
  });

  it('should return false when removing non-existent grade', async () => {
    mockGradeRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.remove(999);
    expect(result).toBe(false);
  });
});
