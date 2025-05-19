import { Test, TestingModule } from '@nestjs/testing';
import { PersonalInformationService } from './personal-information.service';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { PersonalInformation } from './entities/personal-information.entity';
import { UserService } from '../user/user.service';

describe('PersonalInformationService', () => {
  let service: PersonalInformationService;
  let repo: EntityRepository<PersonalInformation>;
  let em: EntityManager;
  let userService: UserService;

  const mockPersonalInfo = {
    info_id: 1,
    user_id: 2,
    first_name: 'Juan',
    last_name: 'Pérez',
  } as PersonalInformation;

  const mockUser = {
    user_id: 2,
    username: 'juanp',
    password_hash: 'hash',
    email: 'juan@mail.com',
    role_id: 1,
    registration_date: new Date(),
    active: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonalInformationService,
        {
          provide: getRepositoryToken(PersonalInformation),
          useValue: {
            create: jest.fn().mockReturnValue(mockPersonalInfo),
            persistAndFlush: jest.fn(),
            findAll: jest.fn().mockResolvedValue([mockPersonalInfo]),
            findOne: jest.fn().mockImplementation(({ info_id, user_id }) => {
              if (info_id === 1 || user_id === 2) return Promise.resolve(mockPersonalInfo);
              return Promise.resolve(null);
            }),
            assign: jest.fn(),
            removeAndFlush: jest.fn(),
          },
        },
        {
          provide: EntityManager,
          useValue: {
            persistAndFlush: jest.fn(),
            flush: jest.fn(),
            removeAndFlush: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<PersonalInformationService>(PersonalInformationService);
    repo = module.get<EntityRepository<PersonalInformation>>(getRepositoryToken(PersonalInformation));
    em = module.get<EntityManager>(EntityManager);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create personal information', async () => {
    const dto = { user_id: 2, first_name: 'Juan', last_name: 'Pérez' };
    const result = await service.create(dto as any);
    expect(result).toEqual(mockPersonalInfo);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(em.persistAndFlush).toHaveBeenCalledWith(mockPersonalInfo);
  });

  it('should find all personal information with user', async () => {
    const result = await service.findAll();
    expect(result[0]).toHaveProperty('user');
    expect(result[0].user).toMatchObject({
      user_id: 2,
      username: 'juanp',
      email: 'juan@mail.com',
    });
  });

  it('should find one personal information with user', async () => {
    const result = await service.findOne(1);
    expect(result).toHaveProperty('user');
    expect(result.user).toMatchObject({
      user_id: 2,
      username: 'juanp',
    });
  });

  it('should return null if personal information not found', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
    const result = await service.findOne(999);
    expect(result).toBeNull();
  });

  it('should find by user id', async () => {
    const result = await service.findByUserId(2);
    expect(result).toHaveProperty('user');
    expect(result.user).toMatchObject({
      user_id: 2,
      username: 'juanp',
    });
  });

  it('should update personal information', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(mockPersonalInfo);
    const dto = { first_name: 'Pedro' };
    const result = await service.update(1, dto as any);
    expect(repo.assign).toHaveBeenCalledWith(mockPersonalInfo, dto);
    expect(em.flush).toHaveBeenCalled();
    expect(result).toEqual(mockPersonalInfo);
  });

  it('should return null when updating non-existent info', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
    const result = await service.update(999, { first_name: 'Pedro' } as any);
    expect(result).toBeNull();
  });

  it('should remove personal information', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(mockPersonalInfo);
    const result = await service.remove(1);
    expect(em.removeAndFlush).toHaveBeenCalledWith(mockPersonalInfo);
    expect(result).toBe(true);
  });

  it('should return false when removing non-existent info', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
    const result = await service.remove(999);
    expect(result).toBe(false);
  });
});
