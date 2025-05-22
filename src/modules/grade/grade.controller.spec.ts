import { Test, TestingModule } from '@nestjs/testing';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { NotFoundException } from '@nestjs/common';

const mockGrade = {
  grade_id: 1,
  student_id: 2,
  group_subject_id: 3,
  partial_1: 8.5,
  partial_2: 9.0,
  partial_3: 7.5,
  final_grade: 8.3,
  update_date: new Date(),
  student: { student_id: 2, user_id: 10, control_number: 'A123', user: { user_id: 10, username: 'alumno' } },
  groupSubject: { group_subject_id: 3, group_id: 4, subject_id: 5, teacher_id: 6, period: '2024-1' },
};

const mockGradeService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByStudentId: jest.fn(),
  findByGroupSubjectId: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('GradeController', () => {
  let controller: GradeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradeController],
      providers: [
        { provide: GradeService, useValue: mockGradeService },
      ],
    }).compile();

    controller = module.get<GradeController>(GradeController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a grade', async () => {
    mockGradeService.create.mockResolvedValueOnce(mockGrade);
    const dto = { student_id: 2, group_subject_id: 3, partial_1: 8.5 };
    const result = await controller.create(dto as any);
    expect(result).toEqual(mockGrade);
  });

  it('should return all grades', async () => {
    mockGradeService.findAll.mockResolvedValueOnce([mockGrade]);
    const result = await controller.findAll();
    expect(result).toEqual([mockGrade]);
  });

  it('should return one grade', async () => {
    mockGradeService.findOne.mockResolvedValueOnce(mockGrade);
    const result = await controller.findOne('1');
    expect(result).toEqual(mockGrade);
  });

  it('should throw NotFoundException if grade not found', async () => {
    mockGradeService.findOne.mockResolvedValueOnce(null);
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should return grades by student_id', async () => {
    mockGradeService.findByStudentId.mockResolvedValueOnce([mockGrade]);
    const result = await controller.findByStudentId('2');
    expect(result).toEqual([mockGrade]);
  });

  it('should return grades by group_subject_id', async () => {
    mockGradeService.findByGroupSubjectId.mockResolvedValueOnce([mockGrade]);
    const result = await controller.findByGroupSubjectId('3');
    expect(result).toEqual([mockGrade]);
  });

  it('should update a grade', async () => {
    mockGradeService.update.mockResolvedValueOnce(mockGrade);
    const dto = { partial_1: 9 };
    const result = await controller.update('1', dto as any);
    expect(result).toEqual(mockGrade);
  });

  it('should throw NotFoundException if update not found', async () => {
    mockGradeService.update.mockResolvedValueOnce(null);
    await expect(controller.update('999', { partial_1: 10 } as any)).rejects.toThrow(NotFoundException);
  });

  it('should remove a grade', async () => {
    mockGradeService.remove.mockResolvedValueOnce(true);
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException if remove not found', async () => {
    mockGradeService.remove.mockResolvedValueOnce(false);
    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });
});
