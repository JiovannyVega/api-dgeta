import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from './state.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/mysql';
import { State } from './entities/state.entity';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { NotFoundException } from '@nestjs/common';

describe('StateService', () => {
    let service: StateService;
    let mockRepository: any;
    let mockEntityManager: any;

    const mockState: State = {
        stateId: 1,
        name: 'Test State',
        code: 'TS',
    } as State;

    beforeEach(async () => {
        mockRepository = {
            findAll: jest.fn(),
            findOne: jest.fn(),
        };

        mockEntityManager = {
            persistAndFlush: jest.fn(),
            flush: jest.fn(),
            removeAndFlush: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StateService,
                {
                    provide: getRepositoryToken(State),
                    useValue: mockRepository,
                },
                {
                    provide: EntityManager,
                    useValue: mockEntityManager,
                },
            ],
        }).compile();

        service = module.get<StateService>(StateService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a state', async () => {
            const createStateDto: CreateStateDto = {
                name: 'Test State',
                code: 'TS',
            };

            mockEntityManager.persistAndFlush.mockResolvedValue(undefined);

            const result = await service.create(createStateDto);

            expect(mockEntityManager.persistAndFlush).toHaveBeenCalled();
            expect(result).toBeInstanceOf(State);
            expect(result.name).toBe(createStateDto.name);
            expect(result.code).toBe(createStateDto.code);
        });
    });

    describe('findAll', () => {
        it('should return all states', async () => {
            const mockStates = [mockState];
            mockRepository.findAll.mockResolvedValue(mockStates);

            const result = await service.findAll();

            expect(mockRepository.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockStates);
        });
    });

    describe('findOne', () => {
        it('should return a state by id', async () => {
            mockRepository.findOne.mockResolvedValue(mockState);

            const result = await service.findOne(1);

            expect(mockRepository.findOne).toHaveBeenCalledWith({ stateId: 1 });
            expect(result).toEqual(mockState);
        });

        it('should throw NotFoundException when state not found', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });

    describe('findByCode', () => {
        it('should return a state by code', async () => {
            mockRepository.findOne.mockResolvedValue(mockState);

            const result = await service.findByCode('TS');

            expect(mockRepository.findOne).toHaveBeenCalledWith({ code: 'TS' });
            expect(result).toEqual(mockState);
        });

        it('should return null when state not found by code', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            const result = await service.findByCode('XX');

            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it('should update a state', async () => {
            const updateStateDto: UpdateStateDto = {
                name: 'Updated State',
            };

            mockRepository.findOne.mockResolvedValue(mockState);
            mockEntityManager.flush.mockResolvedValue(undefined);

            const result = await service.update(1, updateStateDto);

            expect(mockRepository.findOne).toHaveBeenCalledWith({ stateId: 1 });
            expect(mockEntityManager.flush).toHaveBeenCalled();
            expect(result.name).toBe(updateStateDto.name);
        });

        it('should throw NotFoundException when updating non-existent state', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            const updateStateDto: UpdateStateDto = {
                name: 'Updated State',
            };

            await expect(service.update(999, updateStateDto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a state', async () => {
            mockRepository.findOne.mockResolvedValue(mockState);
            mockEntityManager.removeAndFlush.mockResolvedValue(undefined);

            await service.remove(1);

            expect(mockRepository.findOne).toHaveBeenCalledWith({ stateId: 1 });
            expect(mockEntityManager.removeAndFlush).toHaveBeenCalledWith(mockState);
        });

        it('should throw NotFoundException when removing non-existent state', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            await expect(service.remove(999)).rejects.toThrow(NotFoundException);
        });
    });
});
