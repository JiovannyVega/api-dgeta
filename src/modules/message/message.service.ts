import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: EntityRepository<Message>,
    private readonly em: EntityManager,
  ) { }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const entity = this.messageRepo.create({
      ...createMessageDto,
      read: createMessageDto.read ?? false,
    });
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepo.findAll();
  }

  async findOne(id: number): Promise<Message | null> {
    return this.messageRepo.findOne({ message_id: id }) || null;
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message | null> {
    const entity = await this.findOne(id);
    if (!entity) return null;
    this.messageRepo.assign(entity, updateMessageDto);
    await this.em.flush();
    return entity;
  }

  async remove(id: number): Promise<boolean> {
    const entity = await this.findOne(id);
    if (!entity) return false;
    await this.em.removeAndFlush(entity);
    return true;
  }

  async findByReceiverId(receiver_id: number): Promise<Message[]> {
    return this.messageRepo.find({ receiver_id });
  }

  async findBySenderId(sender_id: number): Promise<Message[]> {
    return this.messageRepo.find({ sender_id });
  }
}
