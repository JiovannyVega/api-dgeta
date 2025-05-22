import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { EntityManager } from '@mikro-orm/core';
import { UserService } from '../user/user.service';
import { GroupService } from '../group/group.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';

const mockStudent = {
  student_id: 1,
  user_id: 2,
  group_id: 3,
  control_number: 'A1234567',
  secondary_average: 8.5,
  previous_school: 'Secundaria Técnica 5',
  status: 'Active',
};

const mockUser = { user_id: 2, username: 'juanp', password_hash: 'hash' };
const mockGroup = { group_id: 3, group_name: '1A' };

const mockStudentRepo = {
  create: jest.fn().mockReturnValue(mockStudent),
  findAll: jest.fn().mockResolvedValue([mockStudent]),
  findOne: jest.fn().mockResolvedValue(mockStudent),
  assign: jest.fn(),
  persistAndFlush: jest.fn(),
  removeAndFlush: jest.fn(),
};
const mockEm = {
  persistAndFlush: jest.fn(),
  flush: jest.fn(),
  removeAndFlush: jest.fn(),
};
const mockUserService = {
  findOne: jest.fn().mockResolvedValue(mockUser),
};
const mockGroupService = {
  findOne: jest.fn().mockResolvedValue(mockGroup),
};

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        { provide: getRepositoryToken('Student'), useValue: mockStudentRepo },
        { provide: EntityManager, useValue: mockEm },
        { provide: UserService, useValue: mockUserService },
        { provide: GroupService, useValue: mockGroupService },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a student', async () => {
    mockStudentRepo.persistAndFlush.mockResolvedValueOnce(undefined);
    const result = await service.create({ user_id: 2, control_number: 'A1234567' } as any);
    expect(result).toEqual(mockStudent);
  });

  it('should return all students with user and group', async () => {
    const result = await service.findAll();
    expect(result[0].user).toBeDefined();
    expect(result[0].group).toBeDefined();
    expect(result[0].user.user_id).toBe(2);
    expect(result[0].group.group_id).toBe(3);
  });

  it('should return one student with user and group', async () => {
    const result = await service.findOne(1);
    expect(result.user).toBeDefined();
    expect(result.group).toBeDefined();
    expect(result.user.user_id).toBe(2);
    expect(result.group.group_id).toBe(3);
  });

  it('should return null if student not found', async () => {
    mockStudentRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.findOne(999);
    expect(result).toBeNull();
  });

  it('should update a student', async () => {
    mockEm.flush.mockResolvedValueOnce(undefined);
    const result = await service.update(1, { group_id: 2 } as any);
    expect(result).toEqual(mockStudent);
  });

  it('should return null when updating non-existent student', async () => {
    mockStudentRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.update(999, { group_id: 2 } as any);
    expect(result).toBeNull();
  });

  it('should remove a student', async () => {
    mockStudentRepo.removeAndFlush.mockResolvedValueOnce(undefined);
    const result = await service.remove(1);
    expect(result).toBe(true);
  });

  it('should return false when removing non-existent student', async () => {
    mockStudentRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.remove(999);
    expect(result).toBe(false);
  });

  it('should return student by user_id', async () => {
    const result = await service.findByUserId(2);
    expect(result.user).toBeDefined();
    expect(result.group).toBeDefined();
    expect(result.user.user_id).toBe(2);
    expect(result.group.group_id).toBe(3);
  });

  it('should return null if student by user_id not found', async () => {
    mockStudentRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.findByUserId(999);
    expect(result).toBeNull();
  });
});
