import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from './group.service';
import { EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { ShiftEnum } from './dto/create-group.dto';
import { Specialty } from '../specialty/entities/specialty.entity';

const mockGroupRepo = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  assign: jest.fn(),
  persistAndFlush: jest.fn(),
  removeAndFlush: jest.fn(),
};
const mockSpecialityRepo = {
  findOne: jest.fn(),
};
const mockEm = {
  persistAndFlush: jest.fn(),
  flush: jest.fn(),
  removeAndFlush: jest.fn(),
};

const mockGroup = {
  group_id: 1,
  group_name: '1A',
  shift: ShiftEnum.Morning,
  semester: 1,
  specialty_id: 2,
  specialty: { specialty_id: 2, specialty_name: 'Informática', specialty_code: 'INF', description: 'Especialidad en informática' },
};

describe('GroupService', () => {
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        { provide: getRepositoryToken('Group'), useValue: mockGroupRepo },
        { provide: getRepositoryToken(Specialty), useValue: mockSpecialityRepo },
        { provide: EntityManager, useValue: mockEm },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a group', async () => {
    mockGroupRepo.create.mockReturnValueOnce(mockGroup);
    mockEm.persistAndFlush.mockResolvedValueOnce(undefined);
    const result = await service.create({ group_name: '1A', shift: ShiftEnum.Morning, semester: 1, specialty_id: 2 });
    expect(result).toEqual(mockGroup);
    expect(mockGroupRepo.create).toHaveBeenCalled();
    expect(mockEm.persistAndFlush).toHaveBeenCalled();
  });

  it('should return all groups with specialty', async () => {
    mockGroupRepo.findAll.mockResolvedValueOnce([mockGroup]);
    mockSpecialityRepo.findOne.mockResolvedValueOnce(mockGroup.specialty);
    const result = await service.findAll();
    expect(result[0].specialty).toEqual(mockGroup.specialty);
  });

  it('should return one group with specialty', async () => {
    mockGroupRepo.findOne.mockResolvedValueOnce(mockGroup);
    mockSpecialityRepo.findOne.mockResolvedValueOnce(mockGroup.specialty);
    const result = await service.findOne(1);
    expect(result.specialty).toEqual(mockGroup.specialty);
  });

  it('should return null if group not found', async () => {
    mockGroupRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.findOne(999);
    expect(result).toBeNull();
  });

  it('should update a group', async () => {
    mockGroupRepo.findOne.mockResolvedValueOnce(mockGroup);
    mockEm.flush.mockResolvedValueOnce(undefined);
    const result = await service.update(1, { group_name: '1B' });
    expect(result).toEqual(mockGroup);
    expect(mockGroupRepo.assign).toHaveBeenCalledWith(mockGroup, { group_name: '1B' });
    expect(mockEm.flush).toHaveBeenCalled();
  });

  it('should return null when updating non-existent group', async () => {
    mockGroupRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.update(999, { group_name: 'X' });
    expect(result).toBeNull();
  });

  it('should remove a group', async () => {
    mockGroupRepo.findOne.mockResolvedValueOnce(mockGroup);
    mockEm.removeAndFlush.mockResolvedValueOnce(undefined);
    const result = await service.remove(1);
    expect(result).toBe(true);
    expect(mockEm.removeAndFlush).toHaveBeenCalledWith(mockGroup);
  });

  it('should return false when removing non-existent group', async () => {
    mockGroupRepo.findOne.mockResolvedValueOnce(null);
    const result = await service.remove(999);
    expect(result).toBe(false);
  });
});
