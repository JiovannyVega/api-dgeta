import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { CreatePersonalInformationDto } from './dto/create-personal-information.dto';
import { UpdatePersonalInformationDto } from './dto/update-personal-information.dto';
import { PersonalInformation } from './entities/personal-information.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class PersonalInformationService {
  constructor(
    @InjectRepository(PersonalInformation)
    private readonly personalInfoRepo: EntityRepository<PersonalInformation>,
    private readonly em: EntityManager,
    private readonly userService: UserService,
  ) { }

  async create(createDto: CreatePersonalInformationDto): Promise<PersonalInformation> {
    const entity = this.personalInfoRepo.create(createDto);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<any[]> {
    const infos = await this.personalInfoRepo.findAll();
    const data: any[] = [];
    for (const info of infos) {
      let userSafe: any = null;
      const user = await this.userService.findOne(info.user_id);
      if (user) {
        const { password_hash, ...rest } = user as any;
        userSafe = rest;
      }
      data.push({
        ...info,
        user: userSafe,
      });
    }
    return data;
  }

  async findOne(id: number): Promise<any | null> {
    const info = await this.personalInfoRepo.findOne({ info_id: id });
    if (!info) return null;
    let userSafe: any = null;
    const user = await this.userService.findOne(info.user_id);
    if (user) {
      const { password_hash, ...rest } = user as any;
      userSafe = rest;
    }
    return {
      ...info,
      user: userSafe,
    };
  }

  async findByUserId(user_id: number): Promise<any | null> {
    const info = await this.personalInfoRepo.findOne({ user_id });
    if (!info) return null;
    let userSafe: any = null;
    const user = await this.userService.findOne(user_id);
    if (user) {
      const { password_hash, ...rest } = user as any;
      userSafe = rest;
    }
    return {
      ...info,
      user: userSafe,
    };
  }

  async update(id: number, updateDto: UpdatePersonalInformationDto): Promise<PersonalInformation | null> {
    const entity = await this.personalInfoRepo.findOne({ info_id: id });
    if (!entity) return null;
    this.personalInfoRepo.assign(entity, updateDto);
    await this.em.flush();
    return entity;
  }

  async remove(id: number): Promise<boolean> {
    const entity = await this.personalInfoRepo.findOne({ info_id: id });
    if (!entity) return false;
    await this.em.removeAndFlush(entity);
    return true;
  }
}
