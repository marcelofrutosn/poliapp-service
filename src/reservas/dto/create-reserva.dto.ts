import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
  @IsString()
  @IsNotEmpty()
  apellido: string;
  @IsString()
  @IsNotEmpty()
  reserva: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  date: Date;
  @IsString()
  @IsNotEmpty()
  start: string;
  @IsString()
  @IsNotEmpty()
  end: string;
}
