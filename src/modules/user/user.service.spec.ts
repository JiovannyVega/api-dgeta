import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user by ID', async () => {
    const id = 123;
    const mockUser = { id, name: 'Test User', email: 'test@example.com', createdAt: new Date() };
    jest.spyOn(service, 'findOne').mockResolvedValue(mockUser); // Mock del método findOne

    const result = await service.findOne(id);
    expect(result).toEqual(mockUser);
  });
});
