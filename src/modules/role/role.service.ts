import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
    private readonly em: EntityManager,
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    await this.em.persistAndFlush(role);
    return role;
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  async findOne(id: number): Promise<Role | null> {
    return this.roleRepository.findOne({ role_id: id }) || null;
  }

  async remove(id: number): Promise<boolean> {
    const role = await this.findOne(id);
    if (!role) return false;
    await this.em.removeAndFlush(role);
    return true;
  }
}
