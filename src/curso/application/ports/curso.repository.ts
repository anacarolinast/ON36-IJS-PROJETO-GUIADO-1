import { Injectable } from "@nestjs/common";
import { Curso, PartialCurso } from "../../domain/curso";

@Injectable()
export abstract class CursoRepository {
    abstract salvar(curso: Curso): Promise<Curso>;
    abstract listar(): Promise<Curso[]>;
    abstract buscarPorNome(nome: string): Promise<Curso>;
    abstract buscarPorId(id: string): Promise<Curso>;
    abstract atualizar(id: string, cursoParcial: PartialCurso): Promise<Curso>;
}