import { Injectable } from '@nestjs/common';
import { AlunoRepository } from 'src/aluno/application/ports/aluno.repository'; 
import { Aluno } from 'src/aluno/domain/aluno'; 
import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

@Injectable()
export class InFileAlunoRepository implements AlunoRepository {
  private readonly filePath = path.resolve('./src/aluno/application/ports/mocks/aluno.json');

  async salvar(aluno: Aluno): Promise<Aluno> {
    const alunos = await this.lerAlunos();
    const index = alunos.findIndex(a => a.id === aluno.id);
    if (index !== -1) {
      alunos[index] = aluno;
    } else {
      alunos.push(aluno);
    }
    await this.gravarAlunos(alunos);
    return aluno;
  }

  async listar(): Promise<Aluno[]> {
    return this.lerAlunos();
  }

  async buscarPorEmail(email: string): Promise<Aluno | null> {
    const alunos = await this.lerAlunos();
    return alunos.find(aluno => aluno.email === email) || null;
  }

  async buscarPorId(id: string): Promise<Aluno | null> {
    const alunos = await this.lerAlunos();
    return alunos.find(aluno => aluno.id === id) || null;
  }

  async matricular(alunoId: string, cursoId: string): Promise<void> {
    const alunos = await this.lerAlunos();
    const aluno = alunos.find(a => a.id === alunoId);
    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }

    if (!aluno.cursos) {
      aluno.cursos = [];
    }

    if (aluno.cursos.includes(cursoId)) {
      throw new Error('Aluno já está matriculado neste curso');
    }

    aluno.cursos.push(cursoId);

    await this.salvar(aluno);
  }

  private async lerAlunos(): Promise<Aluno[]> {
    try {
      const data = readFileSync(this.filePath, 'utf8');
      return JSON.parse(data) || [];
    } catch (e) {
      console.error('Erro ao ler o arquivo:', e);
      return [];
    }
  }

  private async gravarAlunos(alunos: Aluno[]): Promise<void> {
    try {
      writeFileSync(this.filePath, JSON.stringify(alunos, null, 2), 'utf8');
    } catch (e) {
      console.error('Erro ao gravar no arquivo:', e);
    }
  }
}
