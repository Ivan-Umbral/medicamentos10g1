import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Direccion } from './direccion.entity';
import { Orden } from './orden.entity';

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

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 150,
  })
  correoElectronico: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 80,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  contrasena: string;

  @OneToOne(() => Direccion, (direccion) => direccion.id, {
    nullable: false,
    eager: true,
    cascade: ['insert'],
  })
  @JoinColumn()
  direccion: Direccion;

  @ManyToOne(() => Role, (role) => role.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  rol: Role;

  @OneToMany(() => Orden, (orden) => orden.repartidor)
  ordenes: Orden[];
}
