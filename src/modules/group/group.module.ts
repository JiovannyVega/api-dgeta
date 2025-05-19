import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group } from './entities/group.entity';
import { Specialitie } from '../specialitie/entities/specialitie.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Group, Specialitie])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule { }
