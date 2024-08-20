import { ConflictException, Injectable } from '@nestjs/common';
import { Aluno } from './entities/aluno.entity';
import { uuid } from 'uuidv4';

@Injectable()
export class AlunosRepository {
  alunos: Aluno[] = [];

  salvar(aluno: Aluno): void {
    if (this.buscarPorMatricula(aluno.matricula)) {
      throw new ConflictException('Aluno já cadastrado');
    }
    aluno.id = uuid();
    this.alunos.push(aluno);
    console.log(`Salvando o aluno ${aluno.nome}`);
  }

  buscarPorMatricula(matricula: string): Aluno | undefined {
    return this.alunos.find((aluno) => aluno.matricula === matricula);
  }
}
