import {IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Min} from 'class-validator';

export class CreateAlunoDto {

    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    endereco: string;

    @IsString()
    telefone: string;
}
