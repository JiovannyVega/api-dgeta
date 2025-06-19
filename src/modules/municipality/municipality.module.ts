import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MunicipalityService } from './municipality.service';
import { MunicipalityController } from './municipality.controller';
import { Municipality } from './entities/municipality.entity';
import { StateModule } from '../state/state.module';

@Module({
    imports: [
        MikroOrmModule.forFeature([Municipality]),
        StateModule,
    ],
    controllers: [MunicipalityController],
    providers: [MunicipalityService],
    exports: [MunicipalityService],
})
export class MunicipalityModule { }
