import { Injectable, ConflictException } from '@nestjs/common';
import { AlunosRepository } from './alunos.repository';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './entities/aluno.entity';

@Injectable()
export class AlunosService {
  constructor(private readonly alunosRepository: AlunosRepository) {}

  cadastrar(createAlunoDto: CreateAlunoDto): void {
    const alunoExistente = this.alunosRepository.buscarPorMatricula(createAlunoDto.matricula);
    if (alunoExistente) {
      throw new ConflictException(`Aluno com matrícula ${createAlunoDto.matricula} já está cadastrado.`);
    }

    const aluno = new Aluno(
      createAlunoDto.nome,
      createAlunoDto.matricula,
      createAlunoDto.email,
      createAlunoDto.endereco,
      createAlunoDto.telefone
    );
    this.alunosRepository.salvar(aluno);
  }
}
