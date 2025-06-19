import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './entities/question.entity';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';

@Module({
    imports: [
        MikroOrmModule.forFeature([Question]),
        QuestionnaireModule,
    ],
    controllers: [QuestionController],
    providers: [QuestionService],
    exports: [QuestionService],
})
export class QuestionModule { }
