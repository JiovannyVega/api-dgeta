import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { QuestionnaireResultService } from './questionnaire-result.service';
import { QuestionnaireResultController } from './questionnaire-result.controller';
import { QuestionnaireResult } from './entities/questionnaire-result.entity';

@Module({
  imports: [MikroOrmModule.forFeature([QuestionnaireResult])],
  controllers: [QuestionnaireResultController],
  providers: [QuestionnaireResultService],
  exports: [QuestionnaireResultService],
})
export class QuestionnaireResultModule { }
