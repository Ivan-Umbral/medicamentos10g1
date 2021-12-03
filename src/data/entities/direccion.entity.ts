import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Farmacia } from './farmacia.entity';
import { Repartidor } from './repartidor.entity';
import { Usuario } from './usuario.entity';
import { Estado } from './estado.entity';
import { Municipio } from './municipio.entity';
import { Colonia } from './colonia.entity';
import { OneToMany } from 'typeorm';

@Entity('direcciones')
export class Direccion {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 150,
  })
  calle: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  numeroInterior?: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  numeroExterior?: number;

  @ManyToOne(() => Estado, (estado) => estado.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  estado: Estado;

  @ManyToOne(() => Municipio, (municipio) => municipio.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  municipio: Municipio;

  @ManyToOne(() => Colonia, (colonia) => colonia.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  colonia: Colonia;

  @OneToMany(() => Farmacia, (farmacia) => farmacia.direccion)
  farmacias: Farmacia[];

  @OneToMany(() => Repartidor, (repartidor) => repartidor.direccion)
  repartidores: Repartidor[];

  @OneToMany(() => Usuario, (user) => user.direccion)
  usuarios: Usuario[];
}
