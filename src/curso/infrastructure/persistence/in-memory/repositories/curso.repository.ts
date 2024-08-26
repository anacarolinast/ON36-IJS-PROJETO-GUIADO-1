import { Injectable, NotFoundException } from "@nestjs/common";
import { CursoMapper } from "../mappers/curso.mapper";
import { Curso, PartialCurso } from "src/curso/domain/curso";
import { CursoRepository } from "src/curso/application/ports/curso.repository";
import { CursoEntity } from "../entities/curso.entity";

@Injectable()
export class InMemoryCursoRepository implements CursoRepository {
    private readonly cursos = new Map<string, CursoEntity>();

    async salvar(curso: Curso): Promise<Curso> {
        const persistenceModel = CursoMapper.paraPersistencia(curso);
        this.cursos.set(persistenceModel.id, persistenceModel);
        const newEntity = this.cursos.get(persistenceModel.id);
        return CursoMapper.paraDominio(newEntity);
    }

    async listar(): Promise<Curso[]> {
        const entities = Array.from(this.cursos.values());
        return entities.map((item) => CursoMapper.paraDominio(item));
    }

    async buscarPorNome(nome: string): Promise<Curso> {
        const entities = Array.from(this.cursos.values());
        const cursoEncontrado = entities.find((item) => item.nome === nome);
        if (!cursoEncontrado) {
            return null;
        }
        return CursoMapper.paraDominio(cursoEncontrado);
    }
    async buscarPorId(id: string): Promise<Curso> {
        const cursoExistente = this.cursos.get(id);
        if (!cursoExistente) {
            return null;
        }
        return CursoMapper.paraDominio(cursoExistente);
    }

    async atualizar(id: string, cursoParcial: PartialCurso): Promise<Curso> {
        const cursoExistente = this.cursos.get(id);
        if (!cursoExistente) {
            throw new NotFoundException('Curso não encontrado');
        }
        const cursoAtualizado: CursoEntity = {
            ...cursoExistente,
            ...cursoParcial,
        };
        this.cursos.set(cursoAtualizado.id, cursoAtualizado);
        return CursoMapper.paraDominio(cursoAtualizado);
    }
}
