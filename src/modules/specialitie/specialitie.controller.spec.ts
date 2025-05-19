import { Test, TestingModule } from '@nestjs/testing';
import { SpecialitieController } from './specialitie.controller';
import { SpecialitieService } from './specialitie.service';

describe('SpecialitieController', () => {
  let controller: SpecialitieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialitieController],
      providers: [SpecialitieService],
    }).compile();

    controller = module.get<SpecialitieController>(SpecialitieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
