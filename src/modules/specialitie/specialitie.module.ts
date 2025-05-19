import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SpecialitieService } from './specialitie.service';
import { SpecialitieController } from './specialitie.controller';
import { Specialitie } from './entities/specialitie.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Specialitie])],
  controllers: [SpecialitieController],
  providers: [SpecialitieService],
})
export class SpecialitieModule { }
