export class Aluno {
  id: string;
  nome: string;
  matricula: string;
  email: string;
  endereco: string;
  telefone: string;
  anoNascimento: number;
  cursos: string[];

  constructor(
    id: string,
    nome: string,
    matricula: string,
    email: string,
    endereco: string,
    telefone: string,
    anoNascimento: number,
    cursos: string[] = [],
  ) {
    this.id = id;
    this.nome = nome;
    this.matricula = matricula;
    this.email = email;
    this.endereco = endereco;
    this.telefone = telefone;
    this.anoNascimento = anoNascimento;
    this.cursos = cursos;
  }
}
