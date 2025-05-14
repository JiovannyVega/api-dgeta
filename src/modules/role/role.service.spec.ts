import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { EntityManager } from '@mikro-orm/core'; // <-- Correct import

describe('RoleService', () => {
  let service: RoleService;

  // Mock classes
  const mockRoleRepository = {};
  const mockEntityManager = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        { provide: 'RoleRepository', useValue: mockRoleRepository },
        { provide: EntityManager, useValue: mockEntityManager }, // Use class, not string
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
