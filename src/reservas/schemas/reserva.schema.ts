import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type ReservaDocument = HydratedDocument<Reserva>;

@Schema()
export class Reserva {
  @Prop()
  nombre: string;
  @Prop()
  apellido: string;
  @Prop()
  reserva: string;
  @Prop()
  email: string;
  @Prop()
  start: Date;
  @Prop()
  end: Date;
  @Prop()
  groupId: mongoose.Types.ObjectId;
  @Prop()
  status: string;
}

export const ReservaSchema = SchemaFactory.createForClass(Reserva);
