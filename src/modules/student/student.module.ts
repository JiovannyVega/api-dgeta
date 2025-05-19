import { Module, forwardRef } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';
import { UserModule } from '../user/user.module';
import { Group } from '../group/entities/group.entity';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Student, Group]),
    UserModule,
    forwardRef(() => GroupModule),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule { }
