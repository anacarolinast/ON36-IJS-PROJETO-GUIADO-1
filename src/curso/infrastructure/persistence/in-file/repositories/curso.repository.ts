import { Injectable } from '@nestjs/common';
import { CursoRepository } from 'src/curso/application/ports/curso.repository';
import { Curso, PartialCurso } from 'src/curso/domain/curso';
import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

@Injectable()
export class InFileCursoRepository implements CursoRepository {
  private readonly filePath = path.resolve('./src/curso/application/ports/mocks/curso.json');

  async salvar(curso: Curso): Promise<Curso> {
    const cursos = await this.lerCursos();
    const index = cursos.findIndex(c => c.id === curso.id);
    if (index !== -1) {
      cursos[index] = curso;
    } else {
      cursos.push(curso);
    }
    await this.gravarCursos(cursos);
    return curso;
  }

  async listar(): Promise<Curso[]> {
    return this.lerCursos();
  }

  async buscarPorNome(nome: string): Promise<Curso | null> {
    const cursos = await this.lerCursos();
    return cursos.find(curso => curso.nome === nome) || null;
  }

  async buscarPorId(id: string): Promise<Curso | null> {
    const cursos = await this.lerCursos();
    return cursos.find(curso => curso.id === id) || null;
  }

  async atualizar(id: string, cursoParcial: PartialCurso): Promise<Curso> {
    const cursos = await this.lerCursos();
    const index = cursos.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Curso não encontrado');
    }

    const cursoAtualizado = { ...cursos[index], ...cursoParcial };
    cursos[index] = cursoAtualizado;
    await this.gravarCursos(cursos);
    return cursoAtualizado;
  }

  private async lerCursos(): Promise<Curso[]> {
    try {
      const data = readFileSync(this.filePath, 'utf8');
      return JSON.parse(data) || [];
    } catch (e) {
      console.error('Erro ao ler o arquivo:', e);
      return [];
    }
  }

  private async gravarCursos(cursos: Curso[]): Promise<void> {
    try {
      writeFileSync(this.filePath, JSON.stringify(cursos, null, 2), 'utf8');
    } catch (e) {
      console.error('Erro ao gravar no arquivo:', e);
    }
  }
}
