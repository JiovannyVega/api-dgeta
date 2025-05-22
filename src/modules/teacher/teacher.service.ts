import { Inject, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Teacher } from './entities/teacher.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { UserService } from '../user/user.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: EntityRepository<Teacher>,
    private readonly em: EntityManager,
    private readonly userService: UserService,
  ) { }

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const entity = this.teacherRepo.create({
      ...createTeacherDto,
      status: createTeacherDto.status ?? 'Active',
    } as any);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<any[]> {
    const teachers = await this.teacherRepo.findAll();
    const data: any[] = [];
    for (const teacher of teachers) {
      let userSafe: any = null;
      const user = await this.userService.findOne(teacher.user_id);
      if (user) {
        const { password_hash, ...rest } = user as any;
        userSafe = rest;
      }
      data.push({
        ...teacher,
        user: userSafe,
      });
    }
    return data;
  }

  async findOne(id: number): Promise<any | null> {
    const teacher = await this.teacherRepo.findOne({ teacher_id: id });
    if (!teacher) return null;
    let userSafe: any = null;
    const user = await this.userService.findOne(teacher.user_id);
    if (user) {
      const { password_hash, ...rest } = user as any;
      userSafe = rest;
    }
    return {
      ...teacher,
      user: userSafe,
    };
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<Teacher | null> {
    const entity = await this.teacherRepo.findOne({ teacher_id: id });
    if (!entity) return null;
    this.teacherRepo.assign(entity, updateTeacherDto);
    await this.em.flush();
    return entity;
  }

  async remove(id: number): Promise<boolean> {
    const entity = await this.teacherRepo.findOne({ teacher_id: id });
    if (!entity) return false;
    await this.em.removeAndFlush(entity);
    return true;
  }
}
