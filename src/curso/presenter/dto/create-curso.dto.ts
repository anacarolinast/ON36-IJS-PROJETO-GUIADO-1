import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateCursoDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsString()
    descricao: string;

    @IsNumber()
    @IsPositive()
    cargaHoraria: number;

    @IsString()
    categoria: string;
}
