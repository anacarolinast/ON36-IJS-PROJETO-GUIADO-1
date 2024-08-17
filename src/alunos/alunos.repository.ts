import { Injectable } from "@nestjs/common";
import { Aluno } from "./entities/aluno.entity";

@Injectable()
export class AlunosRepository {
    alunos: Aluno[] = []

    salvar(aluno: Aluno): void {
        this.alunos.push(aluno);
        console.log(`Salvando aluno ${aluno.nome}`);
    }
}