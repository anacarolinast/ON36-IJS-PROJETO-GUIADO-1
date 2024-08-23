import { IsOptional, IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { UpdateCursoCommand } from 'src/curso/application/commands/update-curso-command';

export class UpdateCursoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nome?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  cargaHoraria?: number;

  @IsOptional()
  @IsString()
  categoria?: string;
}
