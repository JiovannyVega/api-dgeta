import { Module, forwardRef } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group } from './entities/group.entity';
import { Specialitie } from '../specialitie/entities/specialitie.entity';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [MikroOrmModule.forFeature([Group, Specialitie]), forwardRef(() => StudentModule)],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule { }
