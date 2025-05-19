import { Test, TestingModule } from '@nestjs/testing';
import { PersonalInformationController } from './personal-information.controller';
import { PersonalInformationService } from './personal-information.service';

describe('PersonalInformationController', () => {
  let controller: PersonalInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalInformationController],
      providers: [PersonalInformationService],
    }).compile();

    controller = module.get<PersonalInformationController>(PersonalInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
