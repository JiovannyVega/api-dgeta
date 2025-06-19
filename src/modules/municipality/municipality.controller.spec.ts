import { Test, TestingModule } from '@nestjs/testing';
import { MunicipalityController } from './municipality.controller';
import { MunicipalityService } from './municipality.service';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { Municipality } from './entities/municipality.entity';
import { State } from '../state/entities/state.entity';

describe('MunicipalityController', () => {
    let controller: MunicipalityController;
    let service: MunicipalityService;

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

    const mockMunicipalityService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        findByStateId: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MunicipalityController],
            providers: [
                {
                    provide: MunicipalityService,
                    useValue: mockMunicipalityService,
                },
            ],
        }).compile();

        controller = module.get<MunicipalityController>(MunicipalityController);
        service = module.get<MunicipalityService>(MunicipalityService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a municipality', async () => {
            const createMunicipalityDto: CreateMunicipalityDto = {
                name: 'Test Municipality',
                stateId: 1,
            };

            mockMunicipalityService.create.mockResolvedValue(mockMunicipality);

            const result = await controller.create(createMunicipalityDto);

            expect(service.create).toHaveBeenCalledWith(createMunicipalityDto);
            expect(result).toEqual(mockMunicipality);
        });
    });

    describe('findAll', () => {
        it('should return all municipalities', async () => {
            const mockMunicipalities = [mockMunicipality];
            mockMunicipalityService.findAll.mockResolvedValue(mockMunicipalities);

            const result = await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockMunicipalities);
        });
    });

    describe('findOne', () => {
        it('should return a municipality by id', async () => {
            mockMunicipalityService.findOne.mockResolvedValue(mockMunicipality);

            const result = await controller.findOne('1');

            expect(service.findOne).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockMunicipality);
        });
    });

    describe('findByStateId', () => {
        it('should return municipalities by state id', async () => {
            const mockMunicipalities = [mockMunicipality];
            mockMunicipalityService.findByStateId.mockResolvedValue(mockMunicipalities);

            const result = await controller.findByStateId('1');

            expect(service.findByStateId).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockMunicipalities);
        });
    });

    describe('update', () => {
        it('should update a municipality', async () => {
            const updateMunicipalityDto: UpdateMunicipalityDto = {
                name: 'Updated Municipality',
            };

            const updatedMunicipality = { ...mockMunicipality, ...updateMunicipalityDto };
            mockMunicipalityService.update.mockResolvedValue(updatedMunicipality);

            const result = await controller.update('1', updateMunicipalityDto);

            expect(service.update).toHaveBeenCalledWith(1, updateMunicipalityDto);
            expect(result).toEqual(updatedMunicipality);
        });
    });

    describe('remove', () => {
        it('should remove a municipality', async () => {
            mockMunicipalityService.remove.mockResolvedValue(undefined);

            const result = await controller.remove('1');

            expect(service.remove).toHaveBeenCalledWith(1);
            expect(result).toEqual({ deleted: true });
        });
    });
});
