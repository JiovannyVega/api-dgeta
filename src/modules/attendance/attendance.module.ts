import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance } from './entities/attendance.entity';
import { StudentModule } from '../student/student.module';
import { GroupSubjectModule } from '../group-subject/group-subject.module';

@Module({
    imports: [
        MikroOrmModule.forFeature([Attendance]),
        StudentModule,
        GroupSubjectModule,
    ],
    controllers: [AttendanceController],
    providers: [AttendanceService],
    exports: [AttendanceService],
})
export class AttendanceModule { }
