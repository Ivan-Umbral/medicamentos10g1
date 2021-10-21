import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Usuario } from './usuario.entity';
import { Repartidor } from './repartidor.entity';
import { Farmacia } from './farmacia.entity';

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

  @ManyToOne(() => Role, (role) => role.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  rol: Role;

  @OneToOne(() => Usuario, (user) => user.perfil)
  usuario: Usuario;

  @OneToOne(() => Repartidor, (repartidor) => repartidor.perfil)
  repartidor: Repartidor;

  @OneToOne(() => Farmacia, (farmacia) => farmacia.perfil)
  farmacia: Farmacia;
}
