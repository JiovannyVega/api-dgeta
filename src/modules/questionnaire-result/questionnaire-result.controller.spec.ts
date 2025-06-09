import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnaireResultController } from './questionnaire-result.controller';
import { QuestionnaireResultService } from './questionnaire-result.service';

describe('QuestionnaireResultController', () => {
  let controller: QuestionnaireResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnaireResultController],
      providers: [QuestionnaireResultService],
    }).compile();

    controller = module.get<QuestionnaireResultController>(QuestionnaireResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
