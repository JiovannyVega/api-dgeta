import { Test, TestingModule } from '@nestjs/testing';
import { SpecialitieController } from './specialitie.controller';
import { SpecialitieService } from './specialitie.service';
import { NotFoundException } from '@nestjs/common';

const mockSpecialitieService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByCode: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockSpecialitie = {
  specialty_id: 1,
  specialty_name: 'Informática',
  specialty_code: 'INF',
  description: 'Especialidad en informática',
};

describe('SpecialitieController', () => {
  let controller: SpecialitieController;
  let service: SpecialitieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialitieController],
      providers: [
        { provide: SpecialitieService, useValue: mockSpecialitieService },
      ],
    }).compile();

    controller = module.get<SpecialitieController>(SpecialitieController);
    service = module.get<SpecialitieService>(SpecialitieService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a specialitie', async () => {
    mockSpecialitieService.create.mockResolvedValueOnce(mockSpecialitie);
    const dto = { specialty_name: 'Informática', specialty_code: 'INF', description: 'Especialidad en informática' };
    const result = await controller.create(dto as any);
    expect(result).toEqual(mockSpecialitie);
  });

  it('should return all specialties', async () => {
    mockSpecialitieService.findAll.mockResolvedValueOnce([mockSpecialitie]);
    const result = await controller.findAll();
    expect(result).toEqual([mockSpecialitie]);
  });

  it('should return one specialitie', async () => {
    mockSpecialitieService.findOne.mockResolvedValueOnce(mockSpecialitie);
    const result = await controller.findOne('1');
    expect(result).toEqual(mockSpecialitie);
  });

  it('should throw NotFoundException if specialitie not found', async () => {
    mockSpecialitieService.findOne.mockResolvedValueOnce(null);
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should return one specialitie by code', async () => {
    mockSpecialitieService.findByCode.mockResolvedValueOnce(mockSpecialitie);
    const result = await controller.findByCode('INF');
    expect(result).toEqual(mockSpecialitie);
  });

  it('should throw NotFoundException if specialitie by code not found', async () => {
    mockSpecialitieService.findByCode.mockResolvedValueOnce(null);
    await expect(controller.findByCode('NOEXISTE')).rejects.toThrow(NotFoundException);
  });

  it('should update a specialitie', async () => {
    mockSpecialitieService.update.mockResolvedValueOnce(mockSpecialitie);
    const dto = { specialty_name: 'Informática' };
    const result = await controller.update('1', dto as any);
    expect(result).toEqual(mockSpecialitie);
  });

  it('should throw NotFoundException if update not found', async () => {
    mockSpecialitieService.update.mockResolvedValueOnce(null);
    await expect(controller.update('999', { specialty_name: 'X' } as any)).rejects.toThrow(NotFoundException);
  });

  it('should remove a specialitie', async () => {
    mockSpecialitieService.remove.mockResolvedValueOnce(true);
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException if remove not found', async () => {
    mockSpecialitieService.remove.mockResolvedValueOnce(false);
    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });
});
