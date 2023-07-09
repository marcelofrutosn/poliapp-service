import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReservaDto {
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
  start: string;
  @IsString()
  @IsNotEmpty()
  end: string;
  @IsString()
  @IsNotEmpty()
  status: string;
  @IsString()
  @IsNotEmpty()
  groupId: string;
}
