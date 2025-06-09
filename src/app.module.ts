import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { mikroOrmConfig } from './config/database.config';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { PersonalInformationModule } from './modules/personal-information/personal-information.module';
import { StudentModule } from './modules/student/student.module';
import { SpecialityModule } from './modules/specialty/specialty.module'
import { GroupModule } from './modules/group/group.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { SubjectModule } from './modules/subject/subject.module';
import { GroupSubjectModule } from './modules/group-subject/group-subject.module';
import { GradeModule } from './modules/grade/grade.module';
import { FamilyMemberModule } from './modules/family-member/family-member.module';
import { MessageModule } from './modules/message/message.module';
import { QuestionnaireModule } from './modules/questionnaire/questionnaire.module';
import { QuestionnaireResultModule } from './modules/questionnaire-result/questionnaire-result.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    UserModule,
    RoleModule,
    AuthModule,
    PersonalInformationModule,
    StudentModule,
    SpecialityModule,
    GroupModule,
    TeacherModule,
    SubjectModule,
    GroupSubjectModule,
    GradeModule,
    FamilyMemberModule,
    MessageModule,
    QuestionnaireModule,
    QuestionnaireResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
