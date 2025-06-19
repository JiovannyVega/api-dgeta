import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) { }

    @Post()
    async create(@Body() createAttendanceDto: CreateAttendanceDto) {
        return this.attendanceService.create(createAttendanceDto);
    }

    @Get()
    async findAll() {
        return this.attendanceService.findAll();
    }

    @Get('date/:date')
    async findByDate(@Param('date') date: string) {
        return this.attendanceService.findByDate(date);
    }

    @Get('date-range')
    async findByDateRange(
        @Query('start') startDate: string,
        @Query('end') endDate: string
    ) {
        return this.attendanceService.findByDateRange(startDate, endDate);
    }

    @Get('student/:studentId')
    async findByStudentId(@Param('studentId') studentId: string) {
        return this.attendanceService.findByStudentId(+studentId);
    }

    @Get('student/:studentId/date-range')
    async findByStudentAndDateRange(
        @Param('studentId') studentId: string,
        @Query('start') startDate: string,
        @Query('end') endDate: string
    ) {
        return this.attendanceService.findByStudentAndDateRange(+studentId, startDate, endDate);
    }

    @Get('group-subject/:groupSubjectId')
    async findByGroupSubjectId(@Param('groupSubjectId') groupSubjectId: string) {
        return this.attendanceService.findByGroupSubjectId(+groupSubjectId);
    }

    @Get('stats/student/:studentId')
    async getAttendanceStats(
        @Param('studentId') studentId: string,
        @Query('groupSubject') groupSubjectId?: string
    ) {
        const groupSubjectIdNum = groupSubjectId ? +groupSubjectId : undefined;
        return this.attendanceService.getAttendanceStats(+studentId, groupSubjectIdNum);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.attendanceService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
        return this.attendanceService.update(+id, updateAttendanceDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.attendanceService.remove(+id);
        return { deleted: true };
    }
}
