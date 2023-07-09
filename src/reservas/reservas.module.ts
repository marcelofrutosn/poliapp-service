import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reserva, ReservaSchema } from './schemas/reserva.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reserva.name, schema: ReservaSchema }]),
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
