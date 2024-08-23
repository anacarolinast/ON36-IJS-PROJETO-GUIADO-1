import { Module, DynamicModule } from '@nestjs/common';
import { AlunoModule } from 'src/aluno/application/ports/alunos.module'; 
import { InFileCursoRepository } from './persistence/in-file/repositories/curso.repository'; 
import { InMemoryCursoRepository } from './persistence/in-memory/repositories/curso.repository'; 
import { CursoRepository } from '../application/ports/curso.repository';

@Module({})
export class CursoInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory'): DynamicModule {
    const repositoryProvider = driver === 'in-file'
      ? { provide: CursoRepository, useClass: InFileCursoRepository }
      : { provide: CursoRepository, useClass: InMemoryCursoRepository };

    return {
      module: CursoInfrastructureModule,
      imports: [AlunoModule],
      providers: [repositoryProvider],
      exports: [CursoRepository],
    };
  }
}
