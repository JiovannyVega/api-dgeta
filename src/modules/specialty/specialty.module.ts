import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SpecialityService } from './specialty.service';
import { SpecialityController } from './specialty.controller';
import { Specialty } from './entities/specialty.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Specialty])],
  controllers: [SpecialityController],
  providers: [SpecialityService],
})
export class SpecialityModule { }
