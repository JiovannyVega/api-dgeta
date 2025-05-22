import { Module } from '@nestjs/common';
import { FamilyMemberService } from './family-member.service';
import { FamilyMemberController } from './family-member.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FamilyMember } from './entities/family-member.entity';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [MikroOrmModule.forFeature([FamilyMember]), StudentModule],
  controllers: [FamilyMemberController],
  providers: [FamilyMemberService],
  exports: [FamilyMemberService],
})
export class FamilyMemberModule { }
