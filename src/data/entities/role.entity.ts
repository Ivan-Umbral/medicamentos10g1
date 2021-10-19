import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Farmacia } from './farmacia.entity';
import { Repartidor } from './repartidor.entity';
import { Usuario } from './usuario.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  descripcion?: string;

  @OneToMany(() => Farmacia, (farmacia) => farmacia.rol)
  farmacias: Farmacia[];

  @OneToMany(() => Repartidor, (repartidor) => repartidor.rol)
  repartidores: Repartidor[];

  @OneToMany(() => Usuario, (user) => user.rol)
  usuarios: Usuario[];
}
