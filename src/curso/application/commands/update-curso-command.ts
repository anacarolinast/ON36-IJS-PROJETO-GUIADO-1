export class UpdateCursoCommand {
    constructor(
        public readonly nome: string,
        public readonly descricao: string,
        public readonly cargaHoraria: number,
        public readonly categoria: string,
    ) {}
}