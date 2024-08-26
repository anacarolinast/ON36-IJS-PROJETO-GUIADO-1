import { Module } from '@nestjs/common';
import { AlunoRepository } from '../../../application/ports/aluno.repository';
import { InMemoryAlunoRepository } from './repositories/aluno.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AlunoRepository,
      useClass: InMemoryAlunoRepository,
    },
  ],
  exports: [AlunoRepository],
})
export class InMemoryAlunoPersistenceModule {}