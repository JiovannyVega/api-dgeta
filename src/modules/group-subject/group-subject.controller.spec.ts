import { Test, TestingModule } from '@nestjs/testing';
import { GroupSubjectController } from './group-subject.controller';
import { GroupSubjectService } from './group-subject.service';
import { NotFoundException } from '@nestjs/common';

const mockGroupSubject = {
  group_subject_id: 1,
  group_id: 2,
  subject_id: 3,
  teacher_id: 4,
  period: '2024-1',
  group: { group_id: 2, group_name: '1A' },
  subject: { subject_id: 3, subject_name: 'Matemáticas I' },
  teacher: { teacher_id: 4, user_id: 5, employee_number: 'EMP123', user: { user_id: 5, username: 'profe' } },
};

const mockGroupSubjectService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('GroupSubjectController', () => {
  let controller: GroupSubjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupSubjectController],
      providers: [
        { provide: GroupSubjectService, useValue: mockGroupSubjectService },
      ],
    }).compile();

    controller = module.get<GroupSubjectController>(GroupSubjectController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a group-subject', async () => {
    mockGroupSubjectService.create.mockResolvedValueOnce(mockGroupSubject);
    const dto = { group_id: 2, subject_id: 3, teacher_id: 4, period: '2024-1' };
    const result = await controller.create(dto as any);
    expect(result).toEqual(mockGroupSubject);
  });

  it('should return all group-subjects', async () => {
    mockGroupSubjectService.findAll.mockResolvedValueOnce([mockGroupSubject]);
    const result = await controller.findAll();
    expect(result).toEqual([mockGroupSubject]);
  });

  it('should return one group-subject', async () => {
    mockGroupSubjectService.findOne.mockResolvedValueOnce(mockGroupSubject);
    const result = await controller.findOne('1');
    expect(result).toEqual(mockGroupSubject);
  });

  it('should throw NotFoundException if group-subject not found', async () => {
    mockGroupSubjectService.findOne.mockResolvedValueOnce(null);
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should update a group-subject', async () => {
    mockGroupSubjectService.update.mockResolvedValueOnce(mockGroupSubject);
    const dto = { period: '2024-2' };
    const result = await controller.update('1', dto as any);
    expect(result).toEqual(mockGroupSubject);
  });

  it('should throw NotFoundException if update not found', async () => {
    mockGroupSubjectService.update.mockResolvedValueOnce(null);
    await expect(controller.update('999', { period: 'X' } as any)).rejects.toThrow(NotFoundException);
  });

  it('should remove a group-subject', async () => {
    mockGroupSubjectService.remove.mockResolvedValueOnce(true);
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException if remove not found', async () => {
    mockGroupSubjectService.remove.mockResolvedValueOnce(false);
    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });
});
