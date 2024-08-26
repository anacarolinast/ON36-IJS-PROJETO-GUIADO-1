import { forwardRef, Module } from '@nestjs/common';
import { AlunoModule } from 'src/aluno/application/ports/alunos.module'; 
import { CursoService } from '../curso.service'; 
import { InFileCursoRepository } from 'src/curso/infrastructure/persistence/in-file/repositories/curso.repository'; 
import { CursoRepository } from 'src/curso/application/ports/curso.repository'; 
import { CursoFactory } from 'src/curso/domain/factories/curso-factory';
import { CursoController } from 'src/curso/curso.controller';

@Module({
  imports: [forwardRef(() => AlunoModule)],
  providers: [
    CursoService,
    {
      provide: CursoRepository,
      useClass: InFileCursoRepository,
    },
    CursoFactory
  ],
  controllers: [CursoController],
  exports: [CursoService, CursoRepository, CursoFactory],
})
export class CursoModule {}