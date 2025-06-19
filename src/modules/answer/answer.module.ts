import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { Answer } from './entities/answer.entity';
import { QuestionModule } from '../question/question.module';
import { StudentModule } from '../student/student.module';

@Module({
    imports: [
        MikroOrmModule.forFeature([Answer]),
        QuestionModule,
        StudentModule,
    ],
    controllers: [AnswerController],
    providers: [AnswerService],
    exports: [AnswerService],
})
export class AnswerModule { }
