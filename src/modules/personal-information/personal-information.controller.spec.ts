import { Test, TestingModule } from '@nestjs/testing';
import { PersonalInformationController } from './personal-information.controller';
import { PersonalInformationService } from './personal-information.service';
import { NotFoundException } from '@nestjs/common';

describe('PersonalInformationController', () => {
  let controller: PersonalInformationController;
  let service: PersonalInformationService;

  const mockPersonalInfo = {
    info_id: 1,
    user_id: 2,
    first_name: 'Juan',
    last_name: 'Pérez',
    user: { user_id: 2, username: 'juanp' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalInformationController],
      providers: [
        {
          provide: PersonalInformationService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockPersonalInfo),
            findAll: jest.fn().mockResolvedValue([mockPersonalInfo]),
            findOne: jest.fn().mockResolvedValue(mockPersonalInfo),
            findByUserId: jest.fn().mockResolvedValue(mockPersonalInfo),
            update: jest.fn().mockResolvedValue(mockPersonalInfo),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<PersonalInformationController>(PersonalInformationController);
    service = module.get<PersonalInformationService>(PersonalInformationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create personal information', async () => {
    const dto = { user_id: 2, first_name: 'Juan', last_name: 'Pérez' };
    const result = await controller.create(dto as any);
    expect(result).toEqual(mockPersonalInfo);
  });

  it('should return all personal information', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockPersonalInfo]);
  });

  it('should return one personal information', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(mockPersonalInfo);
  });

  it('should throw NotFoundException if not found', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should return by user id', async () => {
    const result = await controller.findByUserId('2');
    expect(result).toEqual(mockPersonalInfo);
  });

  it('should throw NotFoundException if not found by user id', async () => {
    jest.spyOn(service, 'findByUserId').mockResolvedValueOnce(null);
    await expect(controller.findByUserId('999')).rejects.toThrow(NotFoundException);
  });

  it('should update personal information', async () => {
    const dto = { first_name: 'Pedro' };
    const result = await controller.update('1', dto as any);
    expect(result).toEqual(mockPersonalInfo);
  });

  it('should throw NotFoundException if update not found', async () => {
    jest.spyOn(service, 'update').mockResolvedValueOnce(null);
    await expect(controller.update('999', { first_name: 'Pedro' } as any)).rejects.toThrow(NotFoundException);
  });

  it('should remove personal information', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException if remove not found', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce(false);
    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });
});
