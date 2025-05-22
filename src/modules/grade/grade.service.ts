import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './entities/grade.entity';
import { StudentService } from '../student/student.service';
import { GroupSubjectService } from '../group-subject/group-subject.service';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepo: EntityRepository<Grade>,
    private readonly em: EntityManager,
    private readonly studentService: StudentService,
    private readonly groupSubjectService: GroupSubjectService,
  ) { }

  async create(createGradeDto: CreateGradeDto): Promise<Grade> {
    const entity = this.gradeRepo.create(createGradeDto);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<any[]> {
    const grades = await this.gradeRepo.findAll();
    const data: any[] = [];
    for (const grade of grades) {
      const student = await this.studentService.findOne(grade.student_id);
      const groupSubject = await this.groupSubjectService.findOne(grade.group_subject_id);
      data.push({
        ...grade,
        student,
        groupSubject,
      });
    }
    return data;
  }

  async findOne(id: number): Promise<any | null> {
    const grade = await this.gradeRepo.findOne({ grade_id: id });
    if (!grade) return null;
    const student = await this.studentService.findOne(grade.student_id);
    const groupSubject = await this.groupSubjectService.findOne(grade.group_subject_id);
    return {
      ...grade,
      student,
      groupSubject,
    };
  }

  async findByStudentId(student_id: number): Promise<any[]> {
    const grades = await this.gradeRepo.find({ student_id });
    const data: any[] = [];
    for (const grade of grades) {
      const student = await this.studentService.findOne(grade.student_id);
      const groupSubject = await this.groupSubjectService.findOne(grade.group_subject_id);
      data.push({
        ...grade,
        student,
        groupSubject,
      });
    }
    return data;
  }

  async findByGroupSubjectId(group_subject_id: number): Promise<any[]> {
    const grades = await this.gradeRepo.find({ group_subject_id });
    const data: any[] = [];
    for (const grade of grades) {
      const student = await this.studentService.findOne(grade.student_id);
      const groupSubject = await this.groupSubjectService.findOne(grade.group_subject_id);
      data.push({
        ...grade,
        student,
        groupSubject,
      });
    }
    return data;
  }

  async update(id: number, updateGradeDto: UpdateGradeDto): Promise<Grade | null> {
    const entity = await this.gradeRepo.findOne({ grade_id: id });
    if (!entity) return null;
    this.gradeRepo.assign(entity, updateGradeDto);
    await this.em.flush();
    return entity;
  }

  async remove(id: number): Promise<boolean> {
    const entity = await this.gradeRepo.findOne({ grade_id: id });
    if (!entity) return false;
    await this.em.removeAndFlush(entity);
    return true;
  }
}
