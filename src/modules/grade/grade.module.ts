import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Grade } from './entities/grade.entity';
import { StudentModule } from '../student/student.module';
import { GroupSubjectModule } from '../group-subject/group-subject.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Grade]),
    StudentModule,
    GroupSubjectModule,
  ],
  controllers: [GradeController],
  providers: [GradeService],
  exports: [GradeService],
})
export class GradeModule { }
