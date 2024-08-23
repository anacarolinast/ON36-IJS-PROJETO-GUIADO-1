export class Curso {
    id: string;
    nome: string;
    descricao: string;
    cargaHoraria: number;
    categoria: string;
    alunos: string[];
    professores: string[];
    
    constructor(
        id: string,
        nome: string,
        descricao: string,
        cargaHoraria: number,
        categoria: string,
        alunos: string[] = [],
        professores: string[] = [],
    ) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.cargaHoraria = cargaHoraria;
        this.categoria = categoria;
        this.alunos = alunos;
        this.professores = professores;
    }
}

export type PartialCurso = Omit<Curso, 'alunos' | 'professores' | 'id'>;