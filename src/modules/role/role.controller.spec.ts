import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { EntityManager } from '@mikro-orm/core';

describe('RoleController', () => {
  let controller: RoleController;

  const mockRoleRepository = {};
  const mockEntityManager = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        RoleService,
        { provide: 'RoleRepository', useValue: mockRoleRepository },
        { provide: EntityManager, useValue: mockEntityManager },
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
