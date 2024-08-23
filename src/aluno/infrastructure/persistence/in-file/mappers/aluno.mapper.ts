import { Aluno } from '../../../../domain/aluno';
import { AlunoEntity } from '../entities/aluno.entity';

export class AlunoMapper {
  static paraDominio(alunoEntity: AlunoEntity): Aluno {
    const model = new Aluno(
      alunoEntity.id,
      alunoEntity.nome,
      alunoEntity.matricula,
      alunoEntity.endereco,
      alunoEntity.email,
      alunoEntity.telefone,
      alunoEntity.anoNascimento,
      alunoEntity.cursos,
    );
    return model;
  }

  static paraPersistencia(aluno: Aluno) {
    const entity = new AlunoEntity();
    entity.id = aluno.id;
    entity.nome = aluno.nome;
    entity.matricula = aluno.matricula;
    entity.endereco = aluno.endereco;
    entity.email = aluno.email;
    entity.telefone = aluno.telefone;
    entity.anoNascimento = aluno.anoNascimento;
    entity.cursos = aluno.cursos;
    return entity;
  }
}
