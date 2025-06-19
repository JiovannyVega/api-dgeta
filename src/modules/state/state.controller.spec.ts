import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';
import { NotFoundException } from '@nestjs/common';

describe('StateController', () => {
    let controller: StateController;
    let service: StateService;

    const mockState: State = {
        stateId: 1,
        name: 'Test State',
        code: 'TS',
    } as State;

    const mockStateService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        findByCode: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StateController],
            providers: [
                {
                    provide: StateService,
                    useValue: mockStateService,
                },
            ],
        }).compile();

        controller = module.get<StateController>(StateController);
        service = module.get<StateService>(StateService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a state', async () => {
            const createStateDto: CreateStateDto = {
                name: 'Test State',
                code: 'TS',
            };

            mockStateService.create.mockResolvedValue(mockState);

            const result = await controller.create(createStateDto);

            expect(service.create).toHaveBeenCalledWith(createStateDto);
            expect(result).toEqual(mockState);
        });
    });

    describe('findAll', () => {
        it('should return all states', async () => {
            const mockStates = [mockState];
            mockStateService.findAll.mockResolvedValue(mockStates);

            const result = await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockStates);
        });
    });

    describe('findOne', () => {
        it('should return a state by id', async () => {
            mockStateService.findOne.mockResolvedValue(mockState);

            const result = await controller.findOne('1');

            expect(service.findOne).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockState);
        });
    });

    describe('findByCode', () => {
        it('should return a state by code', async () => {
            mockStateService.findByCode.mockResolvedValue(mockState);

            const result = await controller.findByCode('TS');

            expect(service.findByCode).toHaveBeenCalledWith('TS');
            expect(result).toEqual(mockState);
        });

        it('should throw NotFoundException when state not found by code', async () => {
            mockStateService.findByCode.mockResolvedValue(null);

            await expect(controller.findByCode('XX')).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update a state', async () => {
            const updateStateDto: UpdateStateDto = {
                name: 'Updated State',
            };

            const updatedState = { ...mockState, ...updateStateDto };
            mockStateService.update.mockResolvedValue(updatedState);

            const result = await controller.update('1', updateStateDto);

            expect(service.update).toHaveBeenCalledWith(1, updateStateDto);
            expect(result).toEqual(updatedState);
        });
    });

    describe('remove', () => {
        it('should remove a state', async () => {
            mockStateService.remove.mockResolvedValue(undefined);

            const result = await controller.remove('1');

            expect(service.remove).toHaveBeenCalledWith(1);
            expect(result).toEqual({ deleted: true });
        });
    });
});
