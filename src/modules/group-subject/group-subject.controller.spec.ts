import { Test, TestingModule } from '@nestjs/testing';
import { GroupSubjectController } from './group-subject.controller';
import { GroupSubjectService } from './group-subject.service';

describe('GroupSubjectController', () => {
  let controller: GroupSubjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupSubjectController],
      providers: [GroupSubjectService],
    }).compile();

    controller = module.get<GroupSubjectController>(GroupSubjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
