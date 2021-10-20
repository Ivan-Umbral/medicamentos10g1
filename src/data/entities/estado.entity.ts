import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pais } from './pais.entity';
import { Municipio } from './municipio.entity';
import { Direccion } from './direccion.entity';

@Entity('catestados')
export class Estado {
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
    nullable: true,
    length: 255,
  })
  descripcion?: string;

  @ManyToOne(() => Pais, (pais) => pais.id, {
    nullable: false,
  })
  @JoinColumn()
  pais: Pais;

  @OneToMany(() => Municipio, (municipio) => municipio.estado)
  municipios: Municipio[];

  @OneToMany(() => Direccion, (direccion) => direccion.estado)
  direcciones: Direccion[];
}
