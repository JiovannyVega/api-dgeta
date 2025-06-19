import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/mysql';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { StudentService } from '../student/student.service';
import { GroupSubjectService } from '../group-subject/group-subject.service';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: EntityRepository<Attendance>,
        private readonly em: EntityManager,
        private readonly studentService: StudentService,
        private readonly groupSubjectService: GroupSubjectService,
    ) { }

    async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
        const student = await this.studentService.findOne(createAttendanceDto.studentId);
        const groupSubject = await this.groupSubjectService.findOne(createAttendanceDto.groupSubjectId);

        const attendance = new Attendance(
            student,
            groupSubject,
            new Date(createAttendanceDto.date),
            createAttendanceDto.attended,
            createAttendanceDto.justification
        );

        await this.em.persistAndFlush(attendance);
        return attendance;
    }
    async findAll(): Promise<Attendance[]> {
        return this.attendanceRepository.findAll({
            populate: ['student', 'groupSubject']
        });
    }

    async findOne(id: number): Promise<Attendance> {
        const attendance = await this.attendanceRepository.findOne(
            { attendanceId: id },
            { populate: ['student', 'groupSubject'] }
        );
        if (!attendance) {
            throw new NotFoundException(`Attendance with ID ${id} not found`);
        }
        return attendance;
    }

    async findByStudentId(studentId: number): Promise<Attendance[]> {
        return this.attendanceRepository.find(
            { student: { student_id: studentId } },
            {
                populate: ['student', 'groupSubject'],
                orderBy: { date: 'DESC' }
            }
        );
    }

    async findByGroupSubjectId(groupSubjectId: number): Promise<Attendance[]> {
        return this.attendanceRepository.find(
            { groupSubject: { group_subject_id: groupSubjectId } },
            {
                populate: ['student', 'groupSubject'],
                orderBy: { date: 'DESC' }
            }
        );
    }

    async findByDate(date: string): Promise<Attendance[]> {
        return this.attendanceRepository.find(
            { date: new Date(date) },
            {
                populate: ['student', 'groupSubject'],
                orderBy: { student: { student_id: 'ASC' } }
            }
        );
    }

    async findByDateRange(startDate: string, endDate: string): Promise<Attendance[]> {
        return this.attendanceRepository.find(
            { date: { $gte: new Date(startDate), $lte: new Date(endDate) } },
            {
                populate: ['student', 'groupSubject'],
                orderBy: { date: 'DESC' }
            }
        );
    }

    async findByStudentAndDateRange(studentId: number, startDate: string, endDate: string): Promise<Attendance[]> {
        return this.attendanceRepository.find(
            {
                student: { student_id: studentId },
                date: { $gte: new Date(startDate), $lte: new Date(endDate) }
            },
            {
                populate: ['student', 'groupSubject'],
                orderBy: { date: 'DESC' }
            }
        );
    }

    async getAttendanceStats(studentId: number, groupSubjectId?: number): Promise<any> {
        const where: any = { student: { student_id: studentId } };
        if (groupSubjectId) {
            where.groupSubject = { group_subject_id: groupSubjectId };
        }

        const totalAttendance = await this.attendanceRepository.count(where);
        const presentCount = await this.attendanceRepository.count({ ...where, attended: true });
        const absentCount = totalAttendance - presentCount;
        const attendancePercentage = totalAttendance > 0 ? (presentCount / totalAttendance) * 100 : 0;

        return {
            totalClasses: totalAttendance,
            present: presentCount,
            absent: absentCount,
            attendancePercentage: Math.round(attendancePercentage * 100) / 100
        };
    }

    async update(id: number, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance> {
        const attendance = await this.findOne(id);

        if (updateAttendanceDto.attended !== undefined) {
            attendance.attended = updateAttendanceDto.attended;
        }

        if (updateAttendanceDto.justification !== undefined) {
            attendance.justification = updateAttendanceDto.justification;
        }

        if (updateAttendanceDto.date) {
            attendance.date = new Date(updateAttendanceDto.date);
        }

        if (updateAttendanceDto.studentId) {
            const student = await this.studentService.findOne(updateAttendanceDto.studentId);
            attendance.student = student;
        }

        if (updateAttendanceDto.groupSubjectId) {
            const groupSubject = await this.groupSubjectService.findOne(updateAttendanceDto.groupSubjectId);
            attendance.groupSubject = groupSubject;
        }

        await this.em.flush();
        return attendance;
    }

    async remove(id: number): Promise<void> {
        const attendance = await this.findOne(id);
        await this.em.removeAndFlush(attendance);
    }
}
