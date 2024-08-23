import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { Curso } from "../curso";

@Injectable()
export class CursoFactory {
    criar(nome: string, descricao: string, cargaHoraria: number, categoria: string) {
        const cursoId = uuidv4();
        const alunos = [];
        const professores = [];
        return new Curso(cursoId, nome, descricao, cargaHoraria, categoria, alunos, professores);
    }
}