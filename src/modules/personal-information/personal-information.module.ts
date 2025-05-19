import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PersonalInformationService } from './personal-information.service';
import { PersonalInformationController } from './personal-information.controller';
import { PersonalInformation } from './entities/personal-information.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MikroOrmModule.forFeature([PersonalInformation]), UserModule],
  controllers: [PersonalInformationController],
  providers: [PersonalInformationService],
})
export class PersonalInformationModule { }
