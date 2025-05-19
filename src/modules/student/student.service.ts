import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { UserService } from '../user/user.service';
import { GroupService } from '../group/group.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: EntityRepository<Student>,
    private readonly em: EntityManager,
    private readonly userService: UserService,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
  ) { }

  async create(createDto: CreateStudentDto): Promise<Student> {
    const entity = this.studentRepo.create({
      ...createDto,
      status: createDto.status ?? 'Active',
    } as any);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<any[]> {
    const students = await this.studentRepo.findAll();
    const data: any[] = [];
    for (const student of students) {
      let userSafe: any = null;
      const user = await this.userService.findOne(student.user_id);
      if (user) {
        const { password_hash, ...rest } = user as any;
        userSafe = rest;
      }
      let groupSafe: any = null;
      if (student.group_id) {
        const group = await this.groupService.findOne(student.group_id);
        if (group) {
          groupSafe = group;
        }
      }
      data.push({
        ...student,
        user: userSafe,
        group: groupSafe,
      });
    }
    return data;
  }

  async findOne(id: number): Promise<any | null> {
    const student = await this.studentRepo.findOne({ student_id: id });
    if (!student) return null;
    let userSafe: any = null;
    const user = await this.userService.findOne(student.user_id);
    if (user) {
      const { password_hash, ...rest } = user as any;
      userSafe = rest;
    }
    let groupSafe: any = null;
    if (student.group_id) {
      const group = await this.groupService.findOne(student.group_id);
      if (group) {
        groupSafe = group;
      }
    }
    return {
      ...student,
      user: userSafe,
      group: groupSafe,
    };
  }

  async update(id: number, updateDto: UpdateStudentDto): Promise<Student | null> {
    const entity = await this.studentRepo.findOne({ student_id: id });
    if (!entity) return null;
    this.studentRepo.assign(entity, updateDto);
    await this.em.flush();
    return entity;
  }

  async remove(id: number): Promise<boolean> {
    const entity = await this.studentRepo.findOne({ student_id: id });
    if (!entity) return false;
    await this.em.removeAndFlush(entity);
    return true;
  }
}
