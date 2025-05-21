import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { NotFoundException } from '@nestjs/common';
import { StudentStatusEnum } from './dto/create-student.dto';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  const mockStudent = {
    student_id: 1,
    user_id: 2,
    group_id: 3,
    control_number: 'A1234567',
    secondary_average: 8.5,
    previous_school: 'Secundaria Técnica 5',
    status: StudentStatusEnum.Active,
    user: { user_id: 2, username: 'juanp' },
    group: { group_id: 3, group_name: '1A' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockStudent),
            findAll: jest.fn().mockResolvedValue([mockStudent]),
            findOne: jest.fn().mockResolvedValue(mockStudent),
            update: jest.fn().mockResolvedValue(mockStudent),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a student', async () => {
    const dto = { user_id: 2, control_number: 'A1234567' };
    const result = await controller.create(dto as any);
    expect(result).toEqual(mockStudent);
  });

  it('should return all students', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockStudent]);
  });

  it('should return one student', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(mockStudent);
  });

  it('should throw NotFoundException if student not found', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should update a student', async () => {
    const dto = { group_id: 2 };
    jest.spyOn(service, 'update').mockResolvedValueOnce(mockStudent);
    const result = await controller.update('1', dto as any);
    expect(result).toEqual(mockStudent);
  });

  it('should throw NotFoundException if update not found', async () => {
    jest.spyOn(service, 'update').mockResolvedValueOnce(null);
    await expect(controller.update('999', { group_id: 2 } as any)).resolves.toBeNull();
  });

  it('should remove a student', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce(true);
    const result = await controller.remove('1');
    expect(result).toBe(true);
  });

  it('should throw NotFoundException if remove not found', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce(false);
    await expect(controller.remove('999')).resolves.toBe(false);
  });
});
