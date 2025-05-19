import { Test, TestingModule } from '@nestjs/testing';
import { SpecialitieService } from './specialitie.service';
import { EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';

const mockSpecialitie = {
  specialty_id: 1,
  specialty_name: 'Informática',
  specialty_code: 'INF',
  description: 'Especialidad en informática',
};

const mockSpecialitieRepo = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  assign: jest.fn(),
  persistAndFlush: jest.fn(),
  removeAndFlush: jest.fn(),
};
const mockEm = {
  persistAndFlush: jest.fn(),
  flush: jest.fn(),
  removeAndFlush: jest.fn(),
};

describe('SpecialitieService', () => {
  let service: SpecialitieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecialitieService,
        { provide: getRepositoryToken('Specialitie'), useValue: mockSpecialitieRepo },
        { provide: EntityManager, useValue: mockEm },
      ],
    }).compile();

    service = module.get<SpecialitieService>(SpecialitieService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a specialitie', async () => {
    mockSpecialitieRepo.create.mockReturnValueOnce(mockSpecialitie);
    mockEm.persistAndFlush.mockResolvedValueOnce(undefined);
    const result = await service.create({ specialty_name: 'Informática', specialty_code: 'INF', description: 'Especialidad en informática' });
    expect(result).toEqual(mockSpecialitie);
    expect(mockSpecialitieRepo.create).toHaveBeenCalled();
    expect(mockEm.persistAndFlush).toHaveBeenCalled();
  });

  it('should return all specialties', async () => {
    mockSpecialitieRepo.findAll.mockResolvedValueOnce([mockSpecialitie]);
    const result = await service.findAll();
    expect(result).toEqual([mockSpecialitie]);
  });

  it('should return one specialitie by id', async () => {
    mockSpecialitieRepo.findOne.mockResolvedValueOnce(mockSpecialitie);
    const result = await service.findOne(1);
    expect(result).toEqual(mockSpecialitie);
    expect(mockSpecialitieRepo.findOne).toHaveBeenCalledWith({ specialty_id: 1 });
  });

  it('should return null if specialitie by id not found', async () => {
    mockSpecialitieRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.findOne(999);
    expect(result).toBeNull();
  });

  it('should return one specialitie by code', async () => {
    mockSpecialitieRepo.findOne.mockResolvedValueOnce(mockSpecialitie);
    const result = await service.findByCode('INF');
    expect(result).toEqual(mockSpecialitie);
    expect(mockSpecialitieRepo.findOne).toHaveBeenCalledWith({ specialty_code: 'INF' });
  });

  it('should return null if specialitie by code not found', async () => {
    mockSpecialitieRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.findByCode('NOEXISTE');
    expect(result).toBeNull();
  });

  it('should update a specialitie', async () => {
    mockSpecialitieRepo.findOne.mockResolvedValueOnce(mockSpecialitie);
    mockEm.flush.mockResolvedValueOnce(undefined);
    const result = await service.update(1, { specialty_name: 'Informática' });
    expect(result).toEqual(mockSpecialitie);
    expect(mockSpecialitieRepo.assign).toHaveBeenCalledWith(mockSpecialitie, { specialty_name: 'Informática' });
    expect(mockEm.flush).toHaveBeenCalled();
  });

  it('should return null when updating non-existent specialitie', async () => {
    mockSpecialitieRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.update(999, { specialty_name: 'X' });
    expect(result).toBeNull();
  });

  it('should remove a specialitie', async () => {
    mockSpecialitieRepo.findOne.mockResolvedValueOnce(mockSpecialitie);
    mockEm.removeAndFlush.mockResolvedValueOnce(undefined);
    const result = await service.remove(1);
    expect(result).toBe(true);
    expect(mockEm.removeAndFlush).toHaveBeenCalledWith(mockSpecialitie);
  });

  it('should return false when removing non-existent specialitie', async () => {
    mockSpecialitieRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.remove(999);
    expect(result).toBe(false);
  });
});
