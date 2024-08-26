import { Injectable } from '@nestjs/common';
import { Aluno } from '../../domain/aluno';

@Injectable()
export abstract class AlunoRepository {
  abstract salvar(aluno: Aluno): Promise<Aluno>;
  abstract listar(): Promise<Aluno[]>;
  abstract buscarPorEmail(email: string): Promise<Aluno>;
  abstract buscarPorId(id: string): Promise<Aluno | null>;
  abstract matricular(alunoId: string, cursoId: string): Promise<void>;
}
