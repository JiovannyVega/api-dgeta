import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { EntityManager } from '@mikro-orm/core'; // <-- Correct import

describe('UserService', () => {
  let service: UserService;

  // Mock classes
  const mockUserRepository = {};
  const mockEntityManager = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: 'UserRepository', useValue: mockUserRepository },
        { provide: EntityManager, useValue: mockEntityManager }, // Use class, not string
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user by ID', async () => {
    const id = 123;
    const mockUser = {
      user_id: id,
      role_id: 1,
      username: 'testuser',
      password_hash: 'hashedpassword',
      email: 'test@example.com',
      registration_date: new Date(),
      last_login: null,
      active: true,
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(mockUser as any);

    const result = await service.findOne(id);
    expect(result).toEqual(mockUser);
  });
});
