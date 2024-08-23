import { Curso } from "src/curso/domain/curso";
import { CursoEntity } from "../entities/curso.entity";

export class CursoMapper {
    static paraDominio(cursoEntity: CursoEntity): Curso {
        const model = new Curso(
            cursoEntity.id,
            cursoEntity.nome,
            cursoEntity.descricao,
            cursoEntity.cargaHoraria,
            cursoEntity.categoria,
            cursoEntity.alunos,
            cursoEntity.professores
        );
        return model;
    }

    static paraPersistencia(cursoEntity: Curso) {
        const entity = new CursoEntity();
        entity.id = cursoEntity.id;
        entity.nome = cursoEntity.nome;
        entity.descricao = cursoEntity.descricao;
        entity.cargaHoraria = cursoEntity.cargaHoraria;
        entity.categoria = cursoEntity.categoria;
        entity.alunos = cursoEntity.alunos;
        entity.professores = cursoEntity.professores;
        return entity;
    }
}