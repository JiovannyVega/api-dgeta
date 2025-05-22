import { Test, TestingModule } from '@nestjs/testing';
import { FamilyMemberService } from './family-member.service';
import { EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { FamilyMember } from './entities/family-member.entity';
import { StudentService } from '../student/student.service';

const mockFamilyMember: FamilyMember = {
  family_member_id: 1,
  student_id: 2,
  name: 'Juan Pérez',
  relationship: 'Padre',
  phone: '5551234567',
  email: 'juan.perez@email.com',
  address: 'Calle Falsa 123',
  is_guardian: true,
  lives_with_student: true,
};

const mockStudent = { student_id: 2, user_id: 10, control_number: 'A123', user: { user_id: 10, username: 'alumno' } };

const mockFamilyMemberRepo = {
  create: jest.fn().mockReturnValue(mockFamilyMember),
  findAll: jest.fn().mockResolvedValue([mockFamilyMember]),
  findOne: jest.fn().mockResolvedValue(mockFamilyMember),
  find: jest.fn().mockResolvedValue([mockFamilyMember]),
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

describe('FamilyMemberService', () => {
  let service: FamilyMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyMemberService,
        { provide: getRepositoryToken('FamilyMember'), useValue: mockFamilyMemberRepo },
        { provide: EntityManager, useValue: mockEm },
        { provide: StudentService, useValue: mockStudentService },
      ],
    }).compile();

    service = module.get<FamilyMemberService>(FamilyMemberService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a family member', async () => {
    mockEm.persistAndFlush.mockResolvedValueOnce(undefined);
    const dto = { student_id: 2, name: 'Juan Pérez', relationship: 'Padre' };
    const result = await service.create(dto as any);
    expect(result).toEqual(mockFamilyMember);
    expect(mockFamilyMemberRepo.create).toHaveBeenCalledWith(dto);
    expect(mockEm.persistAndFlush).toHaveBeenCalledWith(mockFamilyMember);
  });

  it('should return all family members with student', async () => {
    const result = await service.findAll();
    expect(result[0].student).toEqual(mockStudent);
  });

  it('should return one family member with student', async () => {
    const result = await service.findOne(1);
    expect(result.student).toEqual(mockStudent);
  });

  it('should return null if family member not found', async () => {
    mockFamilyMemberRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.findOne(999);
    expect(result).toBeNull();
  });

  it('should return family members by student_id', async () => {
    mockFamilyMemberRepo.find.mockResolvedValueOnce([mockFamilyMember]);
    const result = await service.findByStudentId(2);
    expect(result[0].student).toEqual(mockStudent);
    expect(mockFamilyMemberRepo.find).toHaveBeenCalledWith({ student_id: 2 });
  });

  it('should update a family member', async () => {
    mockEm.flush.mockResolvedValueOnce(undefined);
    const result = await service.update(1, { name: 'Pedro' } as any);
    expect(result).toEqual(mockFamilyMember);
    expect(mockFamilyMemberRepo.assign).toHaveBeenCalledWith(mockFamilyMember, { name: 'Pedro' });
    expect(mockEm.flush).toHaveBeenCalled();
  });

  it('should return null when updating non-existent family member', async () => {
    mockFamilyMemberRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.update(999, { name: 'X' } as any);
    expect(result).toBeNull();
  });

  it('should remove a family member', async () => {
    mockFamilyMemberRepo.findOne.mockResolvedValueOnce(mockFamilyMember);
    mockEm.removeAndFlush.mockResolvedValueOnce(undefined);
    const result = await service.remove(1);
    expect(result).toBe(true);
    expect(mockEm.removeAndFlush).toHaveBeenCalledWith(mockFamilyMember);
  });

  it('should return false when removing non-existent family member', async () => {
    mockFamilyMemberRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.remove(999);
    expect(result).toBe(false);
  });
});
