import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Message } from './entities/message.entity';

describe('MessageService', () => {
  let service: MessageService;
  let mockMessageRepo: Partial<EntityRepository<Message>>;
  let mockEm: Partial<EntityManager>;

  beforeEach(async () => {
    mockMessageRepo = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
    };
    mockEm = {
      persistAndFlush: jest.fn(),
      flush: jest.fn(),
      removeAndFlush: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: getRepositoryToken(Message), useValue: mockMessageRepo },
        { provide: EntityManager, useValue: mockEm },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByReceiverId', () => {
    it('should return messages for a receiver', async () => {
      const messages = [{ message_id: 1, receiver_id: 2 } as Message];
      (mockMessageRepo.find as jest.Mock).mockResolvedValue(messages);
      const result = await service.findByReceiverId(2);
      expect(result).toEqual(messages);
      expect(mockMessageRepo.find).toHaveBeenCalledWith({ receiver_id: 2 });
    });
  });

  describe('findBySenderId', () => {
    it('should return messages for a sender', async () => {
      const messages = [{ message_id: 1, sender_id: 3 } as Message];
      (mockMessageRepo.find as jest.Mock).mockResolvedValue(messages);
      const result = await service.findBySenderId(3);
      expect(result).toEqual(messages);
      expect(mockMessageRepo.find).toHaveBeenCalledWith({ sender_id: 3 });
    });
  });
});
