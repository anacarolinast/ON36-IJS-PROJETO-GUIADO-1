import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateAlunoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  matricula: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  endereco: string;

  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  anoNascimento: number;
}