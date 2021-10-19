import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orden } from './orden.entity';
import { Medicamento } from './medicamento.entity';

@Entity('detalles-ordenes')
export class DetalleOrden {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  cantidad: number;

  @ManyToOne(() => Orden, (orden) => orden.id, {
    nullable: false,
  })
  @JoinColumn()
  orden: Orden;

  @ManyToOne(() => Medicamento, (medicamento) => medicamento.id, {
    nullable: false,
    eager: true,
  })
  medicamento: Medicamento;
}
