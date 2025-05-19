import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { NotFoundException } from '@nestjs/common';

const mockGroup = {
  group_id: 1,
  group_name: '1A',
  shift: 'Morning',
  semester: 1,
  specialty_id: 2,
  specialty: { specialty_id: 2, specialty_name: 'Informática', specialty_code: 'INF', description: 'Especialidad en informática' },
};

const mockGroupService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('GroupController', () => {
  let controller: GroupController;
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [
        { provide: GroupService, useValue: mockGroupService },
      ],
    }).compile();

    controller = module.get<GroupController>(GroupController);
    service = module.get<GroupService>(GroupService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a group', async () => {
    mockGroupService.create.mockResolvedValueOnce(mockGroup);
    const dto = { group_name: '1A', shift: 'Morning', semester: 1, specialty_id: 2 };
    const result = await controller.create(dto as any);
    expect(result).toEqual(mockGroup);
  });

  it('should return all groups', async () => {
    mockGroupService.findAll.mockResolvedValueOnce([mockGroup]);
    const result = await controller.findAll();
    expect(result).toEqual([mockGroup]);
  });

  it('should return one group', async () => {
    mockGroupService.findOne.mockResolvedValueOnce(mockGroup);
    const result = await controller.findOne('1');
    expect(result).toEqual(mockGroup);
  });

  it('should throw NotFoundException if group not found', async () => {
    mockGroupService.findOne.mockResolvedValueOnce(null);
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should update a group', async () => {
    mockGroupService.update.mockResolvedValueOnce(mockGroup);
    const dto = { group_name: '1B' };
    const result = await controller.update('1', dto as any);
    expect(result).toEqual(mockGroup);
  });

  it('should throw NotFoundException if update not found', async () => {
    mockGroupService.update.mockResolvedValueOnce(null);
    await expect(controller.update('999', { group_name: 'X' } as any)).rejects.toThrow(NotFoundException);
  });

  it('should remove a group', async () => {
    mockGroupService.remove.mockResolvedValueOnce(true);
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException if remove not found', async () => {
    mockGroupService.remove.mockResolvedValueOnce(false);
    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });
});
