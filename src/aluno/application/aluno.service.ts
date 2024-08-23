import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlunoCommand } from './commands/create-aluno-command';
import { AlunoRepository } from './ports/aluno.repository';
import { AlunoFactory } from '../domain/factories/aluno-factory';
import { CursoRepository } from 'src/curso/application/ports/curso.repository';
import { Aluno } from '../domain/aluno';
import { Curso } from 'src/curso/domain/curso';

@Injectable()
export class AlunoService {
  constructor(
    private readonly alunoRepository: AlunoRepository,
    private readonly alunoFactory: AlunoFactory,
    private readonly cursoRepository: CursoRepository,
  ) {}

  listar() {
    return this.alunoRepository.listar();
  }

  async cadastrar(createAlunoCommand: CreateAlunoCommand) {
    this.validarIdadeMinima(createAlunoCommand);
    this.validarSeJaExiste(createAlunoCommand);

    const novoAluno = this.alunoFactory.criar(
      createAlunoCommand.nome,
      createAlunoCommand.matricula,
      createAlunoCommand.endereco,
      createAlunoCommand.email,
      createAlunoCommand.telefone,
      createAlunoCommand.anoNascimento,
    );

    return this.alunoRepository.salvar(novoAluno);
  }

  private validarSeJaExiste(createAlunoCommand: CreateAlunoCommand) {
    const alunoExistente = this.alunoRepository.buscarPorEmail(
      createAlunoCommand.email,
    );
    if (alunoExistente) {
      throw new ConflictException(
        'Já existe um aluno cadastrado com esse email.',
      );
    }
  }

  private validarIdadeMinima(createAlunoCommand: CreateAlunoCommand) {
    const anoAtual = new Date().getFullYear();
    const idade = anoAtual - createAlunoCommand.anoNascimento;
    const IDADE_MIN_CADASTRO = 16;
    if (idade <= IDADE_MIN_CADASTRO) {
      throw new ForbiddenException('A idade mínima para cadastro é 16 anos.');
    }
  }

  async matricular(alunoId: string, cursoId: string): Promise<{ aluno: Aluno; curso: Curso }> {
    const aluno = await this.alunoRepository.buscarPorId(alunoId);
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    const curso = await this.cursoRepository.buscarPorId(cursoId);
    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }

    if (aluno.cursos && aluno.cursos.includes(cursoId)) {
      throw new ForbiddenException('Aluno já está matriculado neste curso');
    }

    aluno.cursos = aluno.cursos || [];
    aluno.cursos.push(cursoId);
    await this.alunoRepository.salvar(aluno);

    // Adiciona o aluno ao curso
    curso.alunos = curso.alunos || [];
    if (!curso.alunos.includes(alunoId)) {
      curso.alunos.push(alunoId);
      await this.cursoRepository.salvar(curso);
    }

    return { aluno, curso };
  }
}
