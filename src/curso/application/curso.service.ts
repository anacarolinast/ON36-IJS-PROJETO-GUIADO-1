import { UpdateCursoCommand } from './commands/update-curso-command';
import { CreateCursoCommand } from './commands/create-curso-command';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CursoRepository } from './ports/curso.repository';
import { CursoFactory } from '../domain/factories/curso-factory';
import { PartialCurso } from '../domain/curso';

@Injectable()
export class CursoService {
  constructor(
    private readonly cursoFactory: CursoFactory,
    private readonly cursoRepository: CursoRepository,
  ) {}

  listar() {
    return this.cursoRepository.listar();
  }

  private validarSeJaExiste(createCursoCommand: CreateCursoCommand) {
    const cursoExistente = this.cursoRepository.buscarPorNome(createCursoCommand.nome);
    if (cursoExistente) {
      throw new ConflictException(
        'Já existe um curso cadastrado com esse nome.',
      );
    }
  }

  cadastrar(CreateCursoCommand: CreateCursoCommand) {
    this.validarSeJaExiste(CreateCursoCommand);
    const novoCurso = this.cursoFactory.criar(
      CreateCursoCommand.nome,
      CreateCursoCommand.descricao,
      CreateCursoCommand.cargaHoraria,
      CreateCursoCommand.categoria,
    );
    return this.cursoRepository.salvar(novoCurso);
  }

  atualizarCurso(
    id: string,
    updateCursoCommand: UpdateCursoCommand,
  ): Promise<PartialCurso> {
    const cursoExistente = this.cursoRepository.buscarPorId(id);
    if (!cursoExistente) {
      throw new NotFoundException('Curso não encontrado');
    }
    const cursoAtualizado = {
      ...cursoExistente,
      ...updateCursoCommand,
    };
    return this.cursoRepository.atualizar(id, cursoAtualizado);
  }
}
