import { Test, TestingModule } from '@nestjs/testing';
import { FamilyMemberController } from './family-member.controller';
import { FamilyMemberService } from './family-member.service';
import { NotFoundException } from '@nestjs/common';

const mockFamilyMember = {
  family_member_id: 1,
  student_id: 2,
  name: 'Juan Pérez',
  relationship: 'Padre',
  phone: '5551234567',
  email: 'juan.perez@email.com',
  address: 'Calle Falsa 123',
  is_guardian: true,
  lives_with_student: true,
  student: { student_id: 2, user_id: 10, control_number: 'A123', user: { user_id: 10, username: 'alumno' } },
};

const mockFamilyMemberService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByStudentId: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('FamilyMemberController', () => {
  let controller: FamilyMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyMemberController],
      providers: [
        { provide: FamilyMemberService, useValue: mockFamilyMemberService },
      ],
    }).compile();

    controller = module.get<FamilyMemberController>(FamilyMemberController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a family member', async () => {
    mockFamilyMemberService.create.mockResolvedValueOnce(mockFamilyMember);
    const dto = { student_id: 2, name: 'Juan Pérez', relationship: 'Padre' };
    const result = await controller.create(dto as any);
    expect(result).toEqual(mockFamilyMember);
  });

  it('should return all family members', async () => {
    mockFamilyMemberService.findAll.mockResolvedValueOnce([mockFamilyMember]);
    const result = await controller.findAll();
    expect(result).toEqual([mockFamilyMember]);
  });

  it('should return one family member', async () => {
    mockFamilyMemberService.findOne.mockResolvedValueOnce(mockFamilyMember);
    const result = await controller.findOne('1');
    expect(result).toEqual(mockFamilyMember);
  });

  it('should throw NotFoundException if family member not found', async () => {
    mockFamilyMemberService.findOne.mockResolvedValueOnce(null);
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should return family members by student_id', async () => {
    mockFamilyMemberService.findByStudentId.mockResolvedValueOnce([mockFamilyMember]);
    const result = await controller.findByStudentId('2');
    expect(result).toEqual([mockFamilyMember]);
  });

  it('should update a family member', async () => {
    mockFamilyMemberService.update.mockResolvedValueOnce(mockFamilyMember);
    const dto = { name: 'Pedro' };
    const result = await controller.update('1', dto as any);
    expect(result).toEqual(mockFamilyMember);
  });

  it('should throw NotFoundException if update not found', async () => {
    mockFamilyMemberService.update.mockResolvedValueOnce(null);
    await expect(controller.update('999', { name: 'X' } as any)).rejects.toThrow(NotFoundException);
  });

  it('should remove a family member', async () => {
    mockFamilyMemberService.remove.mockResolvedValueOnce(true);
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException if remove not found', async () => {
    mockFamilyMemberService.remove.mockResolvedValueOnce(false);
    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });
});
