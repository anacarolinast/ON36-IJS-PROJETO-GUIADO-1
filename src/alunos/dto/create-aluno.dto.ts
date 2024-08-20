import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  matricula: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  endereco: string;

  @IsString()
  telefone: string;
}
