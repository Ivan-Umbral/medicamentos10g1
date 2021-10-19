import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Medicamento } from './medicamento.entity';

@Entity('carritos')
export class Carrito {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  cantidad: number;

  @ManyToOne(() => Usuario, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => Medicamento, (medicamento) => medicamento.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  medicamento: Medicamento;
}
