import { Test, TestingModule } from '@nestjs/testing';
import { SpecialityController } from './specialty.controller';
import { SpecialityService } from './specialty.service';
import { NotFoundException } from '@nestjs/common';

const mockSpecialityService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByCode: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockSpecialty = {
  specialty_id: 1,
  specialty_name: 'Informática',
  specialty_code: 'INF',
  description: 'Especialidad en informática',
};

describe('SpecialityController', () => {
  let controller: SpecialityController;
  let service: SpecialityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialityController],
      providers: [
        { provide: SpecialityService, useValue: mockSpecialityService },
      ],
    }).compile();

    controller = module.get<SpecialityController>(SpecialityController);
    service = module.get<SpecialityService>(SpecialityService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a specialty', async () => {
    mockSpecialityService.create.mockResolvedValueOnce(mockSpecialty);
    const dto = { specialty_name: 'Informática', specialty_code: 'INF', description: 'Especialidad en informática' };
    const result = await controller.create(dto as any);
    expect(result).toEqual(mockSpecialty);
  });

  it('should return all specialties', async () => {
    mockSpecialityService.findAll.mockResolvedValueOnce([mockSpecialty]);
    const result = await controller.findAll();
    expect(result).toEqual([mockSpecialty]);
  });

  it('should return one specialty', async () => {
    mockSpecialityService.findOne.mockResolvedValueOnce(mockSpecialty);
    const result = await controller.findOne('1');
    expect(result).toEqual(mockSpecialty);
  });

  it('should throw NotFoundException if specialty not found', async () => {
    mockSpecialityService.findOne.mockResolvedValueOnce(null);
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should return one specialty by code', async () => {
    mockSpecialityService.findByCode.mockResolvedValueOnce(mockSpecialty);
    const result = await controller.findByCode('INF');
    expect(result).toEqual(mockSpecialty);
  });

  it('should throw NotFoundException if specialty by code not found', async () => {
    mockSpecialityService.findByCode.mockResolvedValueOnce(null);
    await expect(controller.findByCode('NOEXISTE')).rejects.toThrow(NotFoundException);
  });

  it('should update a specialty', async () => {
    mockSpecialityService.update.mockResolvedValueOnce(mockSpecialty);
    const dto = { specialty_name: 'Informática' };
    const result = await controller.update('1', dto as any);
    expect(result).toEqual(mockSpecialty);
  });

  it('should throw NotFoundException if update not found', async () => {
    mockSpecialityService.update.mockResolvedValueOnce(null);
    await expect(controller.update('999', { specialty_name: 'X' } as any)).rejects.toThrow(NotFoundException);
  });

  it('should remove a specialty', async () => {
    mockSpecialityService.remove.mockResolvedValueOnce(true);
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException if remove not found', async () => {
    mockSpecialityService.remove.mockResolvedValueOnce(false);
    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });
});
