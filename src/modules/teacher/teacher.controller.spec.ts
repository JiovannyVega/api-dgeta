import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { NotFoundException } from '@nestjs/common';

const mockTeacher = {
  teacher_id: 1,
  user_id: 2,
  employee_number: 'EMP123',
  academic_degree: 'Licenciatura',
  specialty: 'Matemáticas',
  status: 'Active',
  user: { user_id: 2, username: 'juanp' },
};

const mockTeacherService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  findByUserId: jest.fn().mockResolvedValue(mockTeacher),
};

describe('TeacherController', () => {
  let controller: TeacherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        { provide: TeacherService, useValue: mockTeacherService },
      ],
    }).compile();

    controller = module.get<TeacherController>(TeacherController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a teacher', async () => {
    mockTeacherService.create.mockResolvedValueOnce(mockTeacher);
    const dto = { user_id: 2, employee_number: 'EMP123' };
    const result = await controller.create(dto as any);
    expect(result).toEqual(mockTeacher);
  });

  it('should return all teachers', async () => {
    mockTeacherService.findAll.mockResolvedValueOnce([mockTeacher]);
    const result = await controller.findAll();
    expect(result).toEqual([mockTeacher]);
  });

  it('should return one teacher', async () => {
    mockTeacherService.findOne.mockResolvedValueOnce(mockTeacher);
    const result = await controller.findOne('1');
    expect(result).toEqual(mockTeacher);
  });

  it('should throw NotFoundException if teacher not found', async () => {
    mockTeacherService.findOne.mockResolvedValueOnce(null);
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should return teacher by user_id', async () => {
    mockTeacherService.findByUserId.mockResolvedValueOnce(mockTeacher);
    const result = await controller.findByUserId('2');
    expect(result).toEqual(mockTeacher);
  });

  it('should throw NotFoundException if teacher by user_id not found', async () => {
    mockTeacherService.findByUserId.mockResolvedValueOnce(null);
    await expect(controller.findByUserId('999')).rejects.toThrow(NotFoundException);
  });

  it('should update a teacher', async () => {
    mockTeacherService.update.mockResolvedValueOnce(mockTeacher);
    const dto = { academic_degree: 'Maestría' };
    const result = await controller.update('1', dto as any);
    expect(result).toEqual(mockTeacher);
  });

  it('should throw NotFoundException if update not found', async () => {
    mockTeacherService.update.mockResolvedValueOnce(null);
    await expect(controller.update('999', { academic_degree: 'X' } as any)).rejects.toThrow(NotFoundException);
  });

  it('should remove a teacher', async () => {
    mockTeacherService.remove.mockResolvedValueOnce(true);
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException if remove not found', async () => {
    mockTeacherService.remove.mockResolvedValueOnce(false);
    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });
});
