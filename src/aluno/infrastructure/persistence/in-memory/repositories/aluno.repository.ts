import { Injectable } from '@nestjs/common';
import { AlunoRepository } from 'src/aluno/application/ports/aluno.repository';
import { AlunoEntity } from '../entities/aluno.entity';
import { Aluno } from '../../../../domain/aluno';
import { AlunoMapper } from '../mappers/aluno.mapper';

@Injectable()
export class InMemoryAlunoRepository implements AlunoRepository {
  private readonly alunos = new Map<string, AlunoEntity>();

  async salvar(aluno: Aluno): Promise<Aluno> {
    const persistenceModel = AlunoMapper.paraPersistencia(aluno);
    this.alunos.set(persistenceModel.id, persistenceModel);
    const newEntity = this.alunos.get(persistenceModel.id);
    return AlunoMapper.paraDominio(newEntity);
  }

  async listar(): Promise<Aluno[]> {
    const entities = Array.from(this.alunos.values());
    return entities.map((item) => AlunoMapper.paraDominio(item));
  }

  async buscarPorEmail(email: string): Promise<Aluno | null> {
    const entities = Array.from(this.alunos.values());
    const alunoEncontrado = entities.find((item) => item.email === email);
    if (!alunoEncontrado) {
      return null;
    }
    return AlunoMapper.paraDominio(alunoEncontrado);
  }

  async buscarPorId(id: string): Promise<Aluno | null> {
    const alunoEntity = this.alunos.get(id);
    if (!alunoEntity) {
      return null;
    }
    return AlunoMapper.paraDominio(alunoEntity);
  }

  async matricular(alunoId: string, cursoId: string): Promise<void> {
    const alunoEntity = this.alunos.get(alunoId);
    if (!alunoEntity) {
      throw new Error('Aluno não encontrado');
    }

    if (!alunoEntity.cursos) {
      alunoEntity.cursos = [];
    }

    if (alunoEntity.cursos.includes(cursoId)) {
      throw new Error('Aluno já está matriculado neste curso');
    }

    alunoEntity.cursos.push(cursoId);
    this.alunos.set(alunoId, alunoEntity);
  }
}
