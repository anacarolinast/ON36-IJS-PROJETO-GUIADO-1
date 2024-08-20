import { Test, TestingModule } from '@nestjs/testing';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';
import { AlunosRepository } from './alunos.repository';

describe('AlunosController', () => {
  let controller: AlunosController;
  let service: AlunosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunosController],
      providers: [
        AlunosService,
        AlunosRepository
      ],
    }).compile();

    controller = module.get<AlunosController>(AlunosController);
    service = module.get<AlunosService>(AlunosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
