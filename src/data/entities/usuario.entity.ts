import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Direccion } from './direccion.entity';
import { Carrito } from './carrito.entity';
import { Orden } from './orden.entity';
import { Perfil } from './perfil.entity';

@Entity('usuarios')
export class Usuario {
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
    length: 10,
  })
  telefono: string;

  @OneToOne(() => Direccion, (direccion) => direccion.id, {
    nullable: false,
    eager: true,
    cascade: ['insert'],
  })
  @JoinColumn()
  direccion: Direccion;

  @OneToOne(() => Perfil, (perfil) => perfil.id, {
    nullable: false,
    cascade: ['insert'],
    eager: true,
  })
  @JoinColumn()
  perfil: Perfil;

  @OneToMany(() => Carrito, (carrito) => carrito.usuario)
  productosCarrito: Carrito[];

  @OneToMany(() => Orden, (orden) => orden.usuario)
  ordenes: Orden[];
}
