import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Teacher } from './entities/teacher.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Teacher]),
    UserModule,
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule { }
