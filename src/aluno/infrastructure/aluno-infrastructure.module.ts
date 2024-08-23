import { AlunoRepository } from 'src/aluno/application/ports/aluno.repository';
import { Module, DynamicModule } from '@nestjs/common';
import { InFileAlunoRepository } from './persistence/in-file/repositories/aluno.repository';
import { InMemoryAlunoRepository } from './persistence/in-memory/repositories/aluno.repository';

@Module({})
export class AlunoInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory'): DynamicModule {
    const repositoryProvider = driver === 'in-file'
      ? { provide: AlunoRepository, useClass: InFileAlunoRepository }
      : { provide: AlunoRepository, useClass: InMemoryAlunoRepository };

    return {
      module: AlunoInfrastructureModule,
      providers: [repositoryProvider],
      exports: [AlunoRepository],
    };
  }
}
