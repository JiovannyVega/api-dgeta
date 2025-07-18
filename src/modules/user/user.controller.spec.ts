import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EntityManager } from '@mikro-orm/core'; // <-- Correct import

describe('UserController', () => {
  let controller: UserController;

  // Mock classes
  const mockUserRepository = {};
  const mockEntityManager = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: 'UserRepository', useValue: mockUserRepository },
        { provide: EntityManager, useValue: mockEntityManager }, // Use class, not string
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
