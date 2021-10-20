import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Estado } from './estado.entity';

@Entity('catpaises')
export class Pais {
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

  @OneToMany(() => Estado, (estado) => estado.pais)
  estados: Estado[];
}
