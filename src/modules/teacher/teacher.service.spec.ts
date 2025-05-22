import { Test, TestingModule } from '@nestjs/testing';
import { TeacherService } from './teacher.service';
import { EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { UserService } from '../user/user.service';

const mockTeacher = {
  teacher_id: 1,
  user_id: 2,
  employee_number: 'EMP123',
  academic_degree: 'Licenciatura',
  specialty: 'Matemáticas',
  status: 'Active',
};

const mockUser = { user_id: 2, username: 'juanp', password_hash: 'hash' };

const mockTeacherRepo = {
  create: jest.fn().mockReturnValue(mockTeacher),
  findAll: jest.fn().mockResolvedValue([mockTeacher]),
  findOne: jest.fn().mockResolvedValue(mockTeacher),
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

describe('TeacherService', () => {
  let service: TeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        { provide: getRepositoryToken('Teacher'), useValue: mockTeacherRepo },
        { provide: EntityManager, useValue: mockEm },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a teacher', async () => {
    mockEm.persistAndFlush.mockResolvedValueOnce(undefined);
    const dto = { user_id: 2, employee_number: 'EMP123' };
    const result = await service.create(dto as any);
    expect(result).toEqual(mockTeacher);
    expect(mockTeacherRepo.create).toHaveBeenCalledWith(expect.objectContaining(dto));
    expect(mockEm.persistAndFlush).toHaveBeenCalledWith(mockTeacher);
  });

  it('should return all teachers with user', async () => {
    const result = await service.findAll();
    expect(result[0].user).toBeDefined();
    expect(result[0].user.user_id).toBe(2);
    expect(result[0].employee_number).toBe('EMP123');
  });

  it('should return one teacher with user', async () => {
    const result = await service.findOne(1);
    expect(result.user).toBeDefined();
    expect(result.user.user_id).toBe(2);
    expect(result.employee_number).toBe('EMP123');
  });

  it('should return null if teacher not found', async () => {
    mockTeacherRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.findOne(999);
    expect(result).toBeNull();
  });

  it('should return teacher by user_id', async () => {
    const result = await service.findByUserId(2);
    expect(result.user).toBeDefined();
    expect(result.user.user_id).toBe(2);
    expect(result.employee_number).toBe('EMP123');
  });

  it('should return null if teacher by user_id not found', async () => {
    mockTeacherRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.findByUserId(999);
    expect(result).toBeNull();
  });

  it('should update a teacher', async () => {
    mockEm.flush.mockResolvedValueOnce(undefined);
    const result = await service.update(1, { academic_degree: 'Maestría' } as any);
    expect(result).toEqual(mockTeacher);
    expect(mockTeacherRepo.assign).toHaveBeenCalledWith(mockTeacher, { academic_degree: 'Maestría' });
    expect(mockEm.flush).toHaveBeenCalled();
  });

  it('should return null when updating non-existent teacher', async () => {
    mockTeacherRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.update(999, { academic_degree: 'X' } as any);
    expect(result).toBeNull();
  });

  it('should remove a teacher', async () => {
    mockTeacherRepo.removeAndFlush.mockResolvedValueOnce(undefined);
    const result = await service.remove(1);
    expect(result).toBe(true);
    expect(mockEm.removeAndFlush).toHaveBeenCalledWith(mockTeacher);
  });

  it('should return false when removing non-existent teacher', async () => {
    mockTeacherRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.remove(999);
    expect(result).toBe(false);
  });
});
