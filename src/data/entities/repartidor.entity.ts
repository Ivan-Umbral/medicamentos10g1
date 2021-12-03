import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Direccion } from './direccion.entity';
import { Orden } from './orden.entity';
import { Perfil } from './perfil.entity';

@Entity('repartidores')
export class Repartidor {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 30,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 30,
  })
  apellidoPaterno: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 30,
  })
  apellidoMaterno?: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 13,
  })
  rfc: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 18,
  })
  curp: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  edad: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 10,
  })
  telefono: string;

  @ManyToOne(() => Direccion, (direccion) => direccion.id, {
    nullable: false,
    eager: true,
    cascade: ['insert', 'remove', 'update'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  direccion: Direccion;

  @ManyToOne(() => Perfil, (perfil) => perfil.id, {
    nullable: false,
    cascade: ['insert', 'remove', 'update'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  perfil: Perfil;

  @OneToMany(() => Orden, (orden) => orden.repartidor)
  ordenes: Orden[];
}
