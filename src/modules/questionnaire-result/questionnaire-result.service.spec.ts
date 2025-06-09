import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnaireResultService } from './questionnaire-result.service';

describe('QuestionnaireResultService', () => {
  let service: QuestionnaireResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionnaireResultService],
    }).compile();

    service = module.get<QuestionnaireResultService>(QuestionnaireResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
