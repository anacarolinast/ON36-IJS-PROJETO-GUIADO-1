import { AlunosRepository } from './alunos.repository';
import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';

@Injectable()
export class AlunosService {
  constructor(private readonly alunosRepository: AlunosRepository) {}
  cadastrar(createAlunoDto: CreateAlunoDto) {
    const aluno = new Aluno(createAlunoDto.nome, createAlunoDto.email, createAlunoDto.endereco, createAlunoDto.telefone);
    this.alunosRepository.salvar(aluno);
  }
}
