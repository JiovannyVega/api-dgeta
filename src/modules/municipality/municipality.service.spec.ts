import { Test, TestingModule } from '@nestjs/testing';
import { MunicipalityService } from './municipality.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/mysql';
import { Municipality } from './entities/municipality.entity';
import { StateService } from '../state/state.service';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { NotFoundException } from '@nestjs/common';
import { State } from '../state/entities/state.entity';

describe('MunicipalityService', () => {
    let service: MunicipalityService;
    let mockRepository: any;
    let mockEntityManager: any;
    let mockStateService: any;

    const mockState: State = {
        stateId: 1,
        name: 'Test State',
        code: 'TS',
    } as State;

    const mockMunicipality: Municipality = {
        municipalityId: 1,
        name: 'Test Municipality',
        state: mockState,
    } as Municipality;

    beforeEach(async () => {
        mockRepository = {
            findAll: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
        };

        mockEntityManager = {
            persistAndFlush: jest.fn(),
            flush: jest.fn(),
            removeAndFlush: jest.fn(),
        };

        mockStateService = {
            findOne: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MunicipalityService,
                {
                    provide: getRepositoryToken(Municipality),
                    useValue: mockRepository,
                },
                {
                    provide: EntityManager,
                    useValue: mockEntityManager,
                },
                {
                    provide: StateService,
                    useValue: mockStateService,
                },
            ],
        }).compile();

        service = module.get<MunicipalityService>(MunicipalityService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a municipality', async () => {
            const createMunicipalityDto: CreateMunicipalityDto = {
                name: 'Test Municipality',
                stateId: 1,
            };

            mockStateService.findOne.mockResolvedValue(mockState);
            mockEntityManager.persistAndFlush.mockResolvedValue(undefined);

            const result = await service.create(createMunicipalityDto);

            expect(mockStateService.findOne).toHaveBeenCalledWith(1);
            expect(mockEntityManager.persistAndFlush).toHaveBeenCalled();
            expect(result).toBeInstanceOf(Municipality);
            expect(result.name).toBe(createMunicipalityDto.name);
        });
    });

    describe('findAll', () => {
        it('should return all municipalities with state relation', async () => {
            const mockMunicipalities = [mockMunicipality];
            mockRepository.findAll.mockResolvedValue(mockMunicipalities);

            const result = await service.findAll();

            expect(mockRepository.findAll).toHaveBeenCalledWith({ populate: ['state'] });
            expect(result).toEqual(mockMunicipalities);
        });
    });

    describe('findOne', () => {
        it('should return a municipality by id with state relation', async () => {
            mockRepository.findOne.mockResolvedValue(mockMunicipality);

            const result = await service.findOne(1);

            expect(mockRepository.findOne).toHaveBeenCalledWith(
                { municipalityId: 1 },
                { populate: ['state'] }
            );
            expect(result).toEqual(mockMunicipality);
        });

        it('should throw NotFoundException when municipality not found', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });

    describe('findByStateId', () => {
        it('should return municipalities by state id', async () => {
            const mockMunicipalities = [mockMunicipality];
            mockRepository.find.mockResolvedValue(mockMunicipalities);

            const result = await service.findByStateId(1);

            expect(mockRepository.find).toHaveBeenCalledWith(
                { state: { stateId: 1 } },
                { populate: ['state'] }
            );
            expect(result).toEqual(mockMunicipalities);
        });
    });

    describe('update', () => {
        it('should update a municipality', async () => {
            const updateMunicipalityDto: UpdateMunicipalityDto = {
                name: 'Updated Municipality',
                stateId: 2,
            };

            const newState: State = {
                stateId: 2,
                name: 'New State',
                code: 'NS',
            } as State;

            mockRepository.findOne.mockResolvedValue(mockMunicipality);
            mockStateService.findOne.mockResolvedValue(newState);
            mockEntityManager.flush.mockResolvedValue(undefined);

            const result = await service.update(1, updateMunicipalityDto);

            expect(mockRepository.findOne).toHaveBeenCalledWith(
                { municipalityId: 1 },
                { populate: ['state'] }
            );
            expect(mockStateService.findOne).toHaveBeenCalledWith(2);
            expect(mockEntityManager.flush).toHaveBeenCalled();
            expect(result.name).toBe(updateMunicipalityDto.name);
            expect(result.state).toBe(newState);
        });

        it('should throw NotFoundException when updating non-existent municipality', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            const updateMunicipalityDto: UpdateMunicipalityDto = {
                name: 'Updated Municipality',
            };

            await expect(service.update(999, updateMunicipalityDto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a municipality', async () => {
            mockRepository.findOne.mockResolvedValue(mockMunicipality);
            mockEntityManager.removeAndFlush.mockResolvedValue(undefined);

            await service.remove(1);

            expect(mockRepository.findOne).toHaveBeenCalledWith(
                { municipalityId: 1 },
                { populate: ['state'] }
            );
            expect(mockEntityManager.removeAndFlush).toHaveBeenCalledWith(mockMunicipality);
        });

        it('should throw NotFoundException when removing non-existent municipality', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            await expect(service.remove(999)).rejects.toThrow(NotFoundException);
        });
    });
});
