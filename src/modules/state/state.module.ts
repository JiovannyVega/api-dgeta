import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { State } from './entities/state.entity';

@Module({
    imports: [MikroOrmModule.forFeature([State])],
    controllers: [StateController],
    providers: [StateService],
    exports: [StateService],
})
export class StateModule { }
