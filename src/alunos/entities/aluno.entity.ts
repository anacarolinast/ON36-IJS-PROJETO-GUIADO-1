export class Aluno {
  id: string;
  nome: string;
  matricula: string;
  email: string;
  endereco: string;
  telefone: string;
  cursos: string[];

  constructor(
    nome: string,
    matricula: string,
    email: string,
    endereco: string,
    telefone: string,
    cursos: string[] = [],
  ) {
    this.nome = nome;
    this.matricula = matricula;
    this.email = email;
    this.endereco = endereco;
    this.telefone = telefone;
    this.cursos = cursos;
  }
}
