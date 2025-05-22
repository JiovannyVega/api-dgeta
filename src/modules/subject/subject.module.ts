import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Subject } from './entities/subject.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Subject])],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule { }
