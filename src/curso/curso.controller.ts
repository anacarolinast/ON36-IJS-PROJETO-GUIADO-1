import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { CursoService } from './application/curso.service';
import { CreateCursoDto } from './presenter/dto/create-curso.dto';
import { CreateCursoCommand } from './application/commands/create-curso-command'; 
import { UpdateCursoCommand } from './application/commands/update-curso-command';
import { UpdateCursoDto } from './presenter/dto/update-curso.dto';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  cadastrar(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.cadastrar(
      new CreateCursoCommand(
        createCursoDto.nome,
        createCursoDto.descricao,
        createCursoDto.cargaHoraria,
        createCursoDto.categoria,
      ),
    );
  }

  @Get()
  listar() {
    return this.cursoService.listar();
  }

  @Patch(':id')
  atualizar(
    @Param('id') id: string,
    @Body() updateCursoDto: UpdateCursoDto,
  ) {
    return this.cursoService.atualizarCurso(
      id,
      new UpdateCursoCommand(
        updateCursoDto.nome,
        updateCursoDto.descricao,
        updateCursoDto.cargaHoraria,
        updateCursoDto.categoria,
      ),
    );
  }
}
