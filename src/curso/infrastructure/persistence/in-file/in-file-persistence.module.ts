import { Module } from '@nestjs/common';
import { CursoRepository } from 'src/curso/application/ports/curso.repository';
import { InFileCursoRepository } from './repositories/curso.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: CursoRepository,
      useClass: InFileCursoRepository,
    },
  ],
  exports: [CursoRepository],
})
export class InFileCursoPersistenceModule {}
