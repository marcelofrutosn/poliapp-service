import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reserva } from './schemas/reserva.schema';
import mongoose, { Model } from 'mongoose';
import { differenceInHours } from 'date-fns';

@Injectable()
export class ReservasService {
  constructor(
    @InjectModel(Reserva.name) private reservaModel: Model<Reserva>,
  ) {}

  create({
    nombre,
    apellido,
    reserva,
    start,
    end,
    date,
    email,
  }: CreateReservaDto) {
    const splitedStart = start.split(':');
    const splitedEnd = end.split(':');

    const curatedStart = new Date(date);
    curatedStart.setHours(Number(splitedStart[0]));
    curatedStart.setMinutes(Number(splitedStart[1]));

    const curatedEnd = new Date(date);
    curatedEnd.setHours(Number(splitedEnd[0]));
    curatedEnd.setMinutes(Number(splitedEnd[1]));

    const hoursDifference = differenceInHours(curatedEnd, curatedStart);

    if (hoursDifference < 1) {
      throw new BadRequestException(
        'No se pueden hacer reservas de menos de 1 hora',
      );
    }

    if (hoursDifference > 3) {
      throw new BadRequestException(
        'No se pueden hacer reservas de mas de 3 horas.',
      );
    }

    const newReserva = new this.reservaModel({
      nombre,
      apellido,
      reserva,
      start: curatedStart,
      end: curatedEnd,
      email,
      groupId: new mongoose.Types.ObjectId(),
      status: 'PENDIENTE',
    });

    newReserva.save();

    return 'This action adds a new reserva';
  }

  async findAll(status: string) {
    const query = {
      ...(status && { status }),
    };
    const reservas = await this.reservaModel.find(query);
    return reservas;
  }

  checkAvailability(date: string) {
    return;
  }

  findOne(id: number) {
    return `This action returns a #${id} reserva`;
  }

  async update(id: string, updateReservaDto: UpdateReservaDto) {
    await this.reservaModel.updateMany(
      {
        $or: [
          {
            $and: [
              { start: { $lte: updateReservaDto.start } },
              { end: { $gte: updateReservaDto.end } },
            ],
          },
          {
            $and: [
              { start: { $gte: updateReservaDto.start } },
              { start: { $lte: updateReservaDto.end } },
            ],
          },
          {
            $and: [
              { end: { $gte: updateReservaDto.start } },
              { end: { $lte: updateReservaDto.end } },
            ],
          },
        ],
        //status: 'PENDIENTE',
        _id: { $ne: id },
      },
      { $set: { status: 'RECHAZADO' } },
    );
    //reservas = reservas.filter((reserva) => reserva._id.toString() !== id);

    return this.reservaModel.findOneAndUpdate({ _id: id }, updateReservaDto);
  }

  remove(id: number) {
    return `This action removes a #${id} reserva`;
  }
}
