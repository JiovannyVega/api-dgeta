import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/mysql';
import { Attendance } from './entities/attendance.entity';
import { StudentService } from '../student/student.service';
import { GroupSubjectService } from '../group-subject/group-subject.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { NotFoundException } from '@nestjs/common';

describe('AttendanceService', () => {
    let service: AttendanceService;
    let mockRepository: any;
    let mockEntityManager: any;
    let mockStudentService: any;
    let mockGroupSubjectService: any;

    const mockStudent = { student_id: 1 };
    const mockGroupSubject = { group_subject_id: 1 };
    const mockAttendance = {
        attendanceId: 1,
        student: mockStudent,
        groupSubject: mockGroupSubject,
        date: new Date('2025-01-15'),
        attended: true,
    };

    beforeEach(async () => {
        mockRepository = {
            findAll: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            count: jest.fn(),
        };

        mockEntityManager = {
            persistAndFlush: jest.fn(),
            flush: jest.fn(),
            removeAndFlush: jest.fn(),
        };

        mockStudentService = {
            findOne: jest.fn(),
        };

        mockGroupSubjectService = {
            findOne: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AttendanceService,
                {
                    provide: getRepositoryToken(Attendance),
                    useValue: mockRepository,
                },
                {
                    provide: EntityManager,
                    useValue: mockEntityManager,
                },
                {
                    provide: StudentService,
                    useValue: mockStudentService,
                },
                {
                    provide: GroupSubjectService,
                    useValue: mockGroupSubjectService,
                },
            ],
        }).compile();

        service = module.get<AttendanceService>(AttendanceService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create attendance record', async () => {
            const createAttendanceDto: CreateAttendanceDto = {
                studentId: 1,
                groupSubjectId: 1,
                date: '2025-01-15',
                attended: true,
            };

            mockStudentService.findOne.mockResolvedValue(mockStudent);
            mockGroupSubjectService.findOne.mockResolvedValue(mockGroupSubject);
            mockEntityManager.persistAndFlush.mockResolvedValue(undefined);

            const result = await service.create(createAttendanceDto);

            expect(mockStudentService.findOne).toHaveBeenCalledWith(1);
            expect(mockGroupSubjectService.findOne).toHaveBeenCalledWith(1);
            expect(mockEntityManager.persistAndFlush).toHaveBeenCalled();
            expect(result).toBeInstanceOf(Attendance);
        });
    });

    describe('findAll', () => {
        it('should return all attendance records', async () => {
            const mockAttendances = [mockAttendance];
            mockRepository.findAll.mockResolvedValue(mockAttendances);

            const result = await service.findAll();

            expect(mockRepository.findAll).toHaveBeenCalledWith({
                populate: ['student', 'groupSubject']
            });
            expect(result).toEqual(mockAttendances);
        });
    });

    describe('findOne', () => {
        it('should return attendance record by id', async () => {
            mockRepository.findOne.mockResolvedValue(mockAttendance);

            const result = await service.findOne(1);

            expect(mockRepository.findOne).toHaveBeenCalledWith(
                { attendanceId: 1 },
                { populate: ['student', 'groupSubject'] }
            );
            expect(result).toEqual(mockAttendance);
        });

        it('should throw NotFoundException when attendance not found', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });

    describe('findByStudentId', () => {
        it('should return attendance records by student id', async () => {
            const mockAttendances = [mockAttendance];
            mockRepository.find.mockResolvedValue(mockAttendances);

            const result = await service.findByStudentId(1);

            expect(mockRepository.find).toHaveBeenCalledWith(
                { student: { student_id: 1 } },
                {
                    populate: ['student', 'groupSubject'],
                    orderBy: { date: 'DESC' }
                }
            );
            expect(result).toEqual(mockAttendances);
        });
    });

    describe('getAttendanceStats', () => {
        it('should return attendance statistics', async () => {
            mockRepository.count.mockResolvedValueOnce(20); // total
            mockRepository.count.mockResolvedValueOnce(18); // present

            const result = await service.getAttendanceStats(1);

            expect(result).toEqual({
                totalClasses: 20,
                present: 18,
                absent: 2,
                attendancePercentage: 90
            });
        });

        it('should return 0% when no attendance records', async () => {
            mockRepository.count.mockResolvedValueOnce(0); // total
            mockRepository.count.mockResolvedValueOnce(0); // present

            const result = await service.getAttendanceStats(1);

            expect(result).toEqual({
                totalClasses: 0,
                present: 0,
                absent: 0,
                attendancePercentage: 0
            });
        });
    });
});
