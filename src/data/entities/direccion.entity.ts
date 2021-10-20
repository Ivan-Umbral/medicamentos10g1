import {
  Column,
  Entity,
  OneToOne,
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
  })
  @JoinColumn()
  estado: Estado;

  @ManyToOne(() => Municipio, (municipio) => municipio.id, {
    nullable: false,
  })
  @JoinColumn()
  municipio: Municipio;

  @ManyToOne(() => Colonia, (colonia) => colonia.id, {
    nullable: false,
  })
  @JoinColumn()
  colonia: Colonia;

  @OneToOne(() => Farmacia, (farmacia) => farmacia.direccion)
  farmacia: Farmacia;

  @OneToOne(() => Repartidor, (repartidor) => repartidor.direccion)
  repartidor: Repartidor;

  @OneToOne(() => Usuario, (user) => user.direccion)
  usuario: Usuario;
}
