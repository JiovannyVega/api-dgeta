import { Test, TestingModule } from '@nestjs/testing';
import { SpecialitieService } from './specialitie.service';

describe('SpecialitieService', () => {
  let service: SpecialitieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialitieService],
    }).compile();

    service = module.get<SpecialitieService>(SpecialitieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
