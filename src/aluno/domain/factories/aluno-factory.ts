import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Aluno } from '../aluno';

@Injectable()
export class AlunoFactory {
  criar(nome: string, matricula: string, endereco: string, email: string, telefone: string, anoNascimento: number) {
    const alunoId = uuidv4();
    const alunoCurso = [];
    return new Aluno(alunoId, nome, matricula, endereco, email, telefone, anoNascimento, alunoCurso);
  }
}