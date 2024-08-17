export class Aluno {
    id: string;
    email: string;
    nome: string;
    endereco: string;
    telefone: string;
    cursos: string[];

    constructor(id: string, email: string, nome: string, endereco: string, telefone: string, cursos: string[]) {
        this.id = id;
        this.email = email;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.cursos = cursos;
    }
}
