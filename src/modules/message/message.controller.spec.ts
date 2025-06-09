import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

describe('MessageController', () => {
  let controller: MessageController;
  let service: jest.Mocked<MessageService>;

  const messageMock = {
    message_id: 1,
    sender_id: 1,
    receiver_id: 2,
    subject: 'Test',
    content: 'Hello',
    sent_date: new Date(),
    read: false,
  };

  beforeEach(async () => {
    const mockService: Partial<jest.Mocked<MessageService>> = {
      create: jest.fn().mockResolvedValue(messageMock),
      findAll: jest.fn().mockResolvedValue([messageMock]),
      findOne: jest.fn().mockResolvedValue(messageMock),
      update: jest.fn().mockResolvedValue({ ...messageMock, subject: 'Updated' }),
      remove: jest.fn().mockResolvedValue(true),
      findByReceiverId: jest.fn().mockResolvedValue([messageMock]),
      findBySenderId: jest.fn().mockResolvedValue([messageMock]),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        { provide: MessageService, useValue: mockService },
      ],
    }).compile();
    controller = module.get<MessageController>(MessageController);
    service = module.get(MessageService) as jest.Mocked<MessageService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a message', async () => {
    const dto: CreateMessageDto = {
      sender_id: 1,
      receiver_id: 2,
      subject: 'Test',
      content: 'Hello',
    };
    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(messageMock);
  });

  it('should return all messages', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([messageMock]);
  });

  it('should return a message by id', async () => {
    const result = await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(messageMock);
  });

  it('should throw NotFoundException if message not found', async () => {
    service.findOne.mockResolvedValueOnce(null);
    await expect(controller.findOne('999')).rejects.toThrow('Message #999 not found');
  });

  it('should update a message', async () => {
    const dto: UpdateMessageDto = { subject: 'Updated' };
    const result = await controller.update('1', dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ ...messageMock, subject: 'Updated' });
  });

  it('should throw NotFoundException if update not found', async () => {
    service.update.mockResolvedValueOnce(null);
    await expect(controller.update('999', { subject: 'X' })).rejects.toThrow('Message #999 not found');
  });

  it('should remove a message', async () => {
    const result = await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ deleted: true });
  });

  it('should throw NotFoundException if remove not found', async () => {
    service.remove.mockResolvedValueOnce(false);
    await expect(controller.remove('999')).rejects.toThrow('Message #999 not found');
  });

  it('should return messages by receiver id', async () => {
    const result = await controller.findByReceiverId('2');
    expect(service.findByReceiverId).toHaveBeenCalledWith(2);
    expect(result).toEqual([messageMock]);
  });

  it('should return messages by sender id', async () => {
    const result = await controller.findBySenderId('1');
    expect(service.findBySenderId).toHaveBeenCalledWith(1);
    expect(result).toEqual([messageMock]);
  });
});
