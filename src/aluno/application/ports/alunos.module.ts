import { forwardRef, Module } from '@nestjs/common';
import { AlunoService } from '../aluno.service'; 
import { InFileAlunoRepository } from 'src/aluno/infrastructure/persistence/in-file/repositories/aluno.repository'; 
import { AlunoRepository } from './aluno.repository'; 
import { AlunoFactory } from 'src/aluno/domain/factories/aluno-factory'; 
import { CursoModule } from 'src/curso/application/ports/curso.module'; 
import { AlunoController } from 'src/aluno/presenter/http/alunos.controller';

@Module({
  imports: [forwardRef(() => CursoModule)],
  providers: [
    AlunoService,
    {
      provide: AlunoRepository,
      useClass: InFileAlunoRepository,
    },
    AlunoFactory,
  ],
  controllers: [AlunoController],
  exports: [AlunoRepository, AlunoFactory],
})
export class AlunoModule {}