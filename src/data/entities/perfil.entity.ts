import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Usuario } from './usuario.entity';
import { Repartidor } from './repartidor.entity';
import { Farmacia } from './farmacia.entity';
import { OneToMany } from 'typeorm';

@Entity('perfiles')
export class Perfil {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

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

  @Generated('uuid')
  @Column({
    unique: true,
  })
  refreshToken: string;

  @ManyToOne(() => Role, (role) => role.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  rol: Role;

  @OneToMany(() => Usuario, (user) => user.perfil)
  usuarios: Usuario[];

  @OneToMany(() => Repartidor, (repartidor) => repartidor.perfil)
  repartidores: Repartidor[];

  @OneToMany(() => Farmacia, (farmacia) => farmacia.perfil)
  farmacias: Farmacia[];
}
