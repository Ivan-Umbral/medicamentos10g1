import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TipoPago } from '../enums/tipo-pago.enum';
import { Usuario } from './usuario.entity';
import { Repartidor } from './repartidor.entity';
import { DetalleOrden } from './detalle-orden.entity';

@Entity('ordenes')
export class Orden {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  fecha: string;

  @Column({
    type: 'time',
    nullable: false,
  })
  hora: string;

  @Column({
    type: 'float',
    nullable: false,
  })
  total: number;

  @Column({
    type: 'enum',
    nullable: false,
    enum: TipoPago,
  })
  tipoPago: TipoPago;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  stripeChargeId: string;

  @ManyToOne(() => Usuario, (user) => user.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => Repartidor, (repartidor) => repartidor.id, {
    nullable: true,
    eager: true,
  })
  repartidor?: Repartidor;

  @OneToMany(() => DetalleOrden, (detalleOrden) => detalleOrden.orden, {
    cascade: ['insert'],
  })
  detallesOrdenes: DetalleOrden[];
}
