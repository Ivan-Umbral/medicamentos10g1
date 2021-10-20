import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Estado } from './estado.entity';
import { Colonia } from './colonia.entity';
import { Direccion } from './direccion.entity';

@Entity('catmunicipios')
export class Municipio {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  descripcion?: string;

  @ManyToOne(() => Estado, (estado) => estado.id, {
    nullable: false,
  })
  @JoinColumn()
  estado: Estado;

  @OneToMany(() => Colonia, (colonia) => colonia.municipio)
  colonias: Colonia[];

  @OneToMany(() => Direccion, (direccion) => direccion.municipio)
  direcciones: Direccion[];
}
