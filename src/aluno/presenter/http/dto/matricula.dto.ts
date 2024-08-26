import { IsString } from 'class-validator';

export class MatriculaDto {
  @IsString()
  alunoId: string;

  @IsString()
  cursoId: string;
}
