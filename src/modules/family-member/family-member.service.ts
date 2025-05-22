import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family-member.dto';
import { FamilyMember } from './entities/family-member.entity';
import { StudentService } from '../student/student.service';

@Injectable()
export class FamilyMemberService {
  constructor(
    @InjectRepository(FamilyMember)
    private readonly familyMemberRepo: EntityRepository<FamilyMember>,
    private readonly em: EntityManager,
    private readonly studentService: StudentService,
  ) { }

  async create(createFamilyMemberDto: CreateFamilyMemberDto): Promise<FamilyMember> {
    const entity = this.familyMemberRepo.create(createFamilyMemberDto);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<any[]> {
    const members = await this.familyMemberRepo.findAll();
    const data: any[] = [];
    for (const member of members) {
      const student = await this.studentService.findOne(member.student_id);
      data.push({
        ...member,
        student,
      });
    }
    return data;
  }

  async findOne(id: number): Promise<any | null> {
    const member = await this.familyMemberRepo.findOne({ family_member_id: id });
    if (!member) return null;
    const student = await this.studentService.findOne(member.student_id);
    return {
      ...member,
      student,
    };
  }

  async findByStudentId(student_id: number): Promise<any[]> {
    const members = await this.familyMemberRepo.find({ student_id });
    const data: any[] = [];
    for (const member of members) {
      const student = await this.studentService.findOne(member.student_id);
      data.push({
        ...member,
        student,
      });
    }
    return data;
  }

  async update(id: number, updateFamilyMemberDto: UpdateFamilyMemberDto): Promise<FamilyMember | null> {
    const entity = await this.familyMemberRepo.findOne({ family_member_id: id });
    if (!entity) return null;
    this.familyMemberRepo.assign(entity, updateFamilyMemberDto);
    await this.em.flush();
    return entity;
  }

  async remove(id: number): Promise<boolean> {
    const entity = await this.familyMemberRepo.findOne({ family_member_id: id });
    if (!entity) return false;
    await this.em.removeAndFlush(entity);
    return true;
  }
}
