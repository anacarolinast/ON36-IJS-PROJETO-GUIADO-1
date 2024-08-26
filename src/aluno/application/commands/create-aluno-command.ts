export class CreateAlunoCommand {
  constructor(
    public readonly nome: string,
    public readonly matricula: string,
    public readonly endereco: string,
    public readonly email: string,
    public readonly telefone: string,
    public readonly anoNascimento: number,
  ) {}
}
