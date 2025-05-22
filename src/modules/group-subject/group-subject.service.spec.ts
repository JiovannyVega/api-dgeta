import { Test, TestingModule } from '@nestjs/testing';
import { GroupSubjectService } from './group-subject.service';

describe('GroupSubjectService', () => {
  let service: GroupSubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSubjectService],
    }).compile();

    service = module.get<GroupSubjectService>(GroupSubjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
