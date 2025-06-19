import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { Student } from '../student/entities/student.entity';
import { GroupSubject } from '../group-subject/entities/group-subject.entity';

describe('AttendanceController', () => {
    let controller: AttendanceController;
    let service: AttendanceService;

    const mockStudent: Student = {
        student_id: 1,
    } as Student;

    const mockGroupSubject: GroupSubject = {
        group_subject_id: 1,
    } as GroupSubject;
    const mockAttendance: Attendance = {
        attendanceId: 1,
        student: mockStudent,
        groupSubject: mockGroupSubject,
        date: new Date('2025-01-15'),
        attended: true,
        justification: undefined,
    } as Attendance;

    const mockAttendanceService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        findByDate: jest.fn(),
        findByDateRange: jest.fn(),
        findByStudentId: jest.fn(),
        findByStudentAndDateRange: jest.fn(),
        findByGroupSubjectId: jest.fn(),
        getAttendanceStats: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AttendanceController],
            providers: [
                {
                    provide: AttendanceService,
                    useValue: mockAttendanceService,
                },
            ],
        }).compile();

        controller = module.get<AttendanceController>(AttendanceController);
        service = module.get<AttendanceService>(AttendanceService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create attendance record', async () => {
            const createAttendanceDto: CreateAttendanceDto = {
                studentId: 1,
                groupSubjectId: 1,
                date: '2025-01-15',
                attended: true,
            };

            mockAttendanceService.create.mockResolvedValue(mockAttendance);

            const result = await controller.create(createAttendanceDto);

            expect(service.create).toHaveBeenCalledWith(createAttendanceDto);
            expect(result).toEqual(mockAttendance);
        });
    });

    describe('findAll', () => {
        it('should return all attendance records', async () => {
            const mockAttendances = [mockAttendance];
            mockAttendanceService.findAll.mockResolvedValue(mockAttendances);

            const result = await controller.findAll();

            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockAttendances);
        });
    });

    describe('findByDate', () => {
        it('should return attendance records by date', async () => {
            const mockAttendances = [mockAttendance];
            mockAttendanceService.findByDate.mockResolvedValue(mockAttendances);

            const result = await controller.findByDate('2025-01-15');

            expect(service.findByDate).toHaveBeenCalledWith('2025-01-15');
            expect(result).toEqual(mockAttendances);
        });
    });

    describe('findByDateRange', () => {
        it('should return attendance records by date range', async () => {
            const mockAttendances = [mockAttendance];
            mockAttendanceService.findByDateRange.mockResolvedValue(mockAttendances);

            const result = await controller.findByDateRange('2025-01-01', '2025-01-31');

            expect(service.findByDateRange).toHaveBeenCalledWith('2025-01-01', '2025-01-31');
            expect(result).toEqual(mockAttendances);
        });
    });

    describe('findByStudentId', () => {
        it('should return attendance records by student id', async () => {
            const mockAttendances = [mockAttendance];
            mockAttendanceService.findByStudentId.mockResolvedValue(mockAttendances);

            const result = await controller.findByStudentId('1');

            expect(service.findByStudentId).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockAttendances);
        });
    });

    describe('getAttendanceStats', () => {
        it('should return attendance statistics', async () => {
            const mockStats = {
                totalClasses: 20,
                present: 18,
                absent: 2,
                attendancePercentage: 90.0
            };
            mockAttendanceService.getAttendanceStats.mockResolvedValue(mockStats);

            const result = await controller.getAttendanceStats('1');

            expect(service.getAttendanceStats).toHaveBeenCalledWith(1, undefined);
            expect(result).toEqual(mockStats);
        });

        it('should return attendance statistics for specific group subject', async () => {
            const mockStats = {
                totalClasses: 10,
                present: 9,
                absent: 1,
                attendancePercentage: 90.0
            };
            mockAttendanceService.getAttendanceStats.mockResolvedValue(mockStats);

            const result = await controller.getAttendanceStats('1', '1');

            expect(service.getAttendanceStats).toHaveBeenCalledWith(1, 1);
            expect(result).toEqual(mockStats);
        });
    });

    describe('update', () => {
        it('should update attendance record', async () => {
            const updateAttendanceDto: UpdateAttendanceDto = {
                attended: false,
                justification: 'Medical appointment',
            };

            const updatedAttendance = { ...mockAttendance, ...updateAttendanceDto };
            mockAttendanceService.update.mockResolvedValue(updatedAttendance);

            const result = await controller.update('1', updateAttendanceDto);

            expect(service.update).toHaveBeenCalledWith(1, updateAttendanceDto);
            expect(result).toEqual(updatedAttendance);
        });
    });

    describe('remove', () => {
        it('should remove attendance record', async () => {
            mockAttendanceService.remove.mockResolvedValue(undefined);

            const result = await controller.remove('1');

            expect(service.remove).toHaveBeenCalledWith(1);
            expect(result).toEqual({ deleted: true });
        });
    });
});
