import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Municipio } from './municipio.entity';
import { OneToMany } from 'typeorm';
import { Direccion } from './direccion.entity';

@Entity('catcolonias')
export class Colonia {
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

  @Column({
    type: 'varchar',
    nullable: false,
    length: 5,
  })
  codigoPostal: string;

  @ManyToOne(() => Municipio, (municipio) => municipio.id, {
    nullable: false,
  })
  @JoinColumn()
  municipio: Municipio;

  @OneToMany(() => Direccion, (direccion) => direccion.colonia)
  direcciones: Direccion[];
}
