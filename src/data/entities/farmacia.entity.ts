import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Direccion } from './direccion.entity';
import { Perfil } from './perfil.entity';

@Entity('farmacias')
export class Farmacia {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 100,
  })
  nombre: string;

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
    length: 255,
  })
  descripcion: string;

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

  @Column({
    type: 'varchar',
    nullable: false,
    length: 10,
  })
  telefono: string;

  @OneToOne(() => Perfil, (perfil) => perfil.id, {
    nullable: false,
    cascade: ['insert'],
    eager: true,
  })
  @JoinColumn()
  perfil: Perfil;

  @OneToOne(() => Direccion, (direccion) => direccion.id, {
    nullable: false,
    eager: true,
    cascade: ['insert'],
  })
  @JoinColumn()
  direccion: Direccion;
}
