export class CreateCursoCommand {
    constructor(
        public readonly nome: string,
        public readonly descricao: string,
        public readonly cargaHoraria: number,
        public readonly categoria: string,
    ) {}
}