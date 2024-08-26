import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { AlunoService } from '../../application/aluno.service';
import { CreateAlunoCommand } from 'src/aluno/application/commands/create-aluno-command';
import { MatriculaDto } from './dto/matricula.dto';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Get()
  listar() {
    return this.alunoService.listar();
  }

  @Post()
  cadastrar(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.cadastrar(
      new CreateAlunoCommand(
        createAlunoDto.nome,
        createAlunoDto.matricula,
        createAlunoDto.endereco,
        createAlunoDto.email,
        createAlunoDto.telefone,
        createAlunoDto.anoNascimento,
      ),
    );
  }

  @Post('matricular')
async matricular(@Body() matriculaDto: MatriculaDto) {
  const { alunoId, cursoId } = matriculaDto;
  return this.alunoService.matricular(alunoId, cursoId);
}
}
