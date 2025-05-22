import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { CreateGroupSubjectDto } from './dto/create-group-subject.dto';
import { UpdateGroupSubjectDto } from './dto/update-group-subject.dto';
import { GroupSubject } from './entities/group-subject.entity';
import { GroupService } from '../group/group.service';
import { SubjectService } from '../subject/subject.service';
import { TeacherService } from '../teacher/teacher.service';

@Injectable()
export class GroupSubjectService {
  constructor(
    @InjectRepository(GroupSubject)
    private readonly groupSubjectRepo: EntityRepository<GroupSubject>,
    private readonly em: EntityManager,
    private readonly groupService: GroupService,
    private readonly subjectService: SubjectService,
    private readonly teacherService: TeacherService,
  ) { }

  async create(createDto: CreateGroupSubjectDto): Promise<GroupSubject> {
    const entity = this.groupSubjectRepo.create(createDto);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<any[]> {
    const groupSubjects = await this.groupSubjectRepo.findAll();
    const data: any[] = [];
    for (const gs of groupSubjects) {
      const group = await this.groupService.findOne(gs.group_id);
      const subject = await this.subjectService.findOne(gs.subject_id);
      const teacher = await this.teacherService.findOne(gs.teacher_id);
      data.push({
        ...gs,
        group,
        subject,
        teacher,
      });
    }
    return data;
  }

  async findOne(id: number): Promise<any | null> {
    const gs = await this.groupSubjectRepo.findOne({ group_subject_id: id });
    if (!gs) return null;
    const group = await this.groupService.findOne(gs.group_id);
    const subject = await this.subjectService.findOne(gs.subject_id);
    const teacher = await this.teacherService.findOne(gs.teacher_id);
    return {
      ...gs,
      group,
      subject,
      teacher,
    };
  }

  async update(id: number, updateDto: UpdateGroupSubjectDto): Promise<GroupSubject | null> {
    const entity = await this.groupSubjectRepo.findOne({ group_subject_id: id });
    if (!entity) return null;
    this.groupSubjectRepo.assign(entity, updateDto);
    await this.em.flush();
    return entity;
  }

  async remove(id: number): Promise<boolean> {
    const entity = await this.groupSubjectRepo.findOne({ group_subject_id: id });
    if (!entity) return false;
    await this.em.removeAndFlush(entity);
    return true;
  }
}
