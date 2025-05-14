import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>, // Repositorio de la entidad User
    private readonly em: EntityManager, // EntityManager para persistir datos
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    await this.em.persistAndFlush(user); // Usar EntityManager para persistir
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) return null;
    this.userRepository.assign(user, updateUserDto);
    await this.em.flush(); // Usar EntityManager para guardar cambios
    return user;
  }

  async remove(id: number): Promise<boolean> {
    const user = await this.findOne(id);
    if (!user) return false;
    await this.em.removeAndFlush(user); // Usar EntityManager para eliminar
    return true;
  }
}
