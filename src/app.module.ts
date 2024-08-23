import { Module, DynamicModule } from '@nestjs/common';
import { AlunoModule } from './aluno/application/ports/alunos.module';
import { CursoModule } from './curso/application/ports/curso.module'; 
import { InFileAlunoRepository } from './aluno/infrastructure/persistence/in-file/repositories/aluno.repository'; 
import { InMemoryAlunoRepository } from './aluno/infrastructure/persistence/in-memory/repositories/aluno.repository'; 
import { InFileCursoRepository } from './curso/infrastructure/persistence/in-file/repositories/curso.repository'; 
import { InMemoryCursoRepository } from './curso/infrastructure/persistence/in-memory/repositories/curso.repository'; 
import { AlunoRepository } from './aluno/application/ports/aluno.repository';
import { CursoRepository } from './curso/application/ports/curso.repository';

@Module({})
export class AppModule {
  static register(options: { driver: 'in-file' | 'in-memory' }): DynamicModule {
    const { driver } = options;

    return {
      module: AppModule,
      imports: [
        CursoModule,
        AlunoModule,
      ],
      providers: [
        {
          provide: AlunoRepository,
          useClass: driver === 'in-file' ? InFileAlunoRepository : InMemoryAlunoRepository,
        },
        {
          provide: CursoRepository,
          useClass: driver === 'in-file' ? InFileCursoRepository : InMemoryCursoRepository,
        },
      ],
    };
  }
}
