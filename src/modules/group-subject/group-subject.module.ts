import { Module } from '@nestjs/common';
import { GroupSubjectService } from './group-subject.service';
import { GroupSubjectController } from './group-subject.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GroupSubject } from './entities/group-subject.entity';
import { GroupModule } from '../group/group.module';
import { SubjectModule } from '../subject/subject.module';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([GroupSubject]),
    GroupModule,
    SubjectModule,
    TeacherModule,
  ],
  controllers: [GroupSubjectController],
  providers: [GroupSubjectService],
  exports: [GroupSubjectService],
})
export class GroupSubjectModule { }
