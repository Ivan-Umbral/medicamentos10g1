import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Farmacia } from './farmacia.entity';
import { Repartidor } from './repartidor.entity';
import { Usuario } from './usuario.entity';

@Entity('direcciones')
export class Direccion {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  estado: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 90,
  })
  municipio: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 150,
  })
  localidad: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 5,
  })
  codigoPostal: string;

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

  @OneToOne(() => Farmacia, (farmacia) => farmacia.direccion)
  farmacia: Farmacia;

  @OneToOne(() => Repartidor, (repartidor) => repartidor.direccion)
  repartidor: Repartidor;

  @OneToOne(() => Usuario, (user) => user.direccion)
  usuario: Usuario;
}
