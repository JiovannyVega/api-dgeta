import { Test, TestingModule } from '@nestjs/testing';
import { GroupSubjectService } from './group-subject.service';
import { EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { GroupSubject } from './entities/group-subject.entity';
import { GroupService } from '../group/group.service';
import { SubjectService } from '../subject/subject.service';
import { TeacherService } from '../teacher/teacher.service';

const mockGroupSubject: GroupSubject = {
  group_subject_id: 1,
  group_id: 2,
  subject_id: 3,
  teacher_id: 4,
  period: '2024-1',
};

const mockGroup = { group_id: 2, group_name: '1A' };
const mockSubject = { subject_id: 3, subject_name: 'Matemáticas I' };
const mockTeacher = { teacher_id: 4, user_id: 5, employee_number: 'EMP123', user: { user_id: 5, username: 'profe' } };

const mockGroupSubjectRepo = {
  create: jest.fn().mockReturnValue(mockGroupSubject),
  findAll: jest.fn().mockResolvedValue([mockGroupSubject]),
  findOne: jest.fn().mockResolvedValue(mockGroupSubject),
  assign: jest.fn(),
  persistAndFlush: jest.fn(),
  removeAndFlush: jest.fn(),
};
const mockEm = {
  persistAndFlush: jest.fn(),
  flush: jest.fn(),
  removeAndFlush: jest.fn(),
};
const mockGroupService = {
  findOne: jest.fn().mockResolvedValue(mockGroup),
};
const mockSubjectService = {
  findOne: jest.fn().mockResolvedValue(mockSubject),
};
const mockTeacherService = {
  findOne: jest.fn().mockResolvedValue(mockTeacher),
};

describe('GroupSubjectService', () => {
  let service: GroupSubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupSubjectService,
        { provide: getRepositoryToken('GroupSubject'), useValue: mockGroupSubjectRepo },
        { provide: EntityManager, useValue: mockEm },
        { provide: GroupService, useValue: mockGroupService },
        { provide: SubjectService, useValue: mockSubjectService },
        { provide: TeacherService, useValue: mockTeacherService },
      ],
    }).compile();

    service = module.get<GroupSubjectService>(GroupSubjectService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a group-subject', async () => {
    mockEm.persistAndFlush.mockResolvedValueOnce(undefined);
    const dto = { group_id: 2, subject_id: 3, teacher_id: 4, period: '2024-1' };
    const result = await service.create(dto);
    expect(result).toEqual(mockGroupSubject);
    expect(mockGroupSubjectRepo.create).toHaveBeenCalledWith(dto);
    expect(mockEm.persistAndFlush).toHaveBeenCalledWith(mockGroupSubject);
  });

  it('should return all group-subjects with relations', async () => {
    const result = await service.findAll();
    expect(result[0].group).toEqual(mockGroup);
    expect(result[0].subject).toEqual(mockSubject);
    expect(result[0].teacher).toEqual(mockTeacher);
  });

  it('should return one group-subject with relations', async () => {
    const result = await service.findOne(1);
    expect(result.group).toEqual(mockGroup);
    expect(result.subject).toEqual(mockSubject);
    expect(result.teacher).toEqual(mockTeacher);
  });

  it('should return null if group-subject not found', async () => {
    mockGroupSubjectRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.findOne(999);
    expect(result).toBeNull();
  });

  it('should update a group-subject', async () => {
    mockEm.flush.mockResolvedValueOnce(undefined);
    const dto = { period: '2024-2' };
    const result = await service.update(1, dto as any);
    expect(result).toEqual(mockGroupSubject);
    expect(mockGroupSubjectRepo.assign).toHaveBeenCalledWith(mockGroupSubject, dto);
    expect(mockEm.flush).toHaveBeenCalled();
  });

  it('should return null when updating non-existent group-subject', async () => {
    mockGroupSubjectRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.update(999, { period: 'X' } as any);
    expect(result).toBeNull();
  });

  it('should remove a group-subject', async () => {
    mockGroupSubjectRepo.removeAndFlush.mockResolvedValueOnce(undefined);
    const result = await service.remove(1);
    expect(result).toBe(true);
    expect(mockEm.removeAndFlush).toHaveBeenCalledWith(mockGroupSubject);
  });

  it('should return false when removing non-existent group-subject', async () => {
    mockGroupSubjectRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.remove(999);
    expect(result).toBe(false);
  });
});
