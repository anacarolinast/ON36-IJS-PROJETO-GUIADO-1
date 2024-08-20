import { Test, TestingModule } from '@nestjs/testing';
import { AlunosService } from './alunos.service';
import { AlunosRepository } from './alunos.repository';
import { Aluno } from './entities/aluno.entity';
import { ConflictException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';

describe('AlunosService', () => {
  let service: AlunosService;
  let repository: AlunosRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlunosService,
        AlunosRepository,
      ],
    }).compile();

    service = module.get<AlunosService>(AlunosService);
    repository = module.get<AlunosRepository>(AlunosRepository);
  });

  it('deve cadastrar um aluno se a matrícula for única', () => {
    const createAlunoDto: CreateAlunoDto = {
      nome: 'João Silva',
      matricula: '123',
      email: 'joao@example.com',
      endereco: 'Rua A, 123',
      telefone: '123456789'
    };

    jest.spyOn(repository, 'buscarPorMatricula').mockReturnValue(undefined);
    jest.spyOn(repository, 'salvar').mockImplementation(() => {});

    service.cadastrar(createAlunoDto);

    expect(repository.salvar).toHaveBeenCalledWith(expect.objectContaining({
      nome: 'João Silva',
      matricula: '123',
      email: 'joao@example.com',
      endereco: 'Rua A, 123',
      telefone: '123456789'
    }));
  });

  it('deve lançar uma exceção se a matrícula já existir', () => {
    const createAlunoDto: CreateAlunoDto = {
      nome: 'João Silva',
      matricula: '123',
      email: 'joao@example.com',
      endereco: 'Rua A, 123',
      telefone: '123456789'
    };

    const alunoExistente: Aluno = new Aluno(
      'João Silva',
      '123',
      'joao@example.com',
      'Rua A, 123',
      '123456789'
    );

    jest.spyOn(repository, 'buscarPorMatricula').mockReturnValue(alunoExistente);

    expect(() => service.cadastrar(createAlunoDto)).toThrow(ConflictException);
  });
});
