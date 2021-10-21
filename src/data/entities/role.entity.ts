import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Perfil } from './perfil.entity';

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

  @OneToMany(() => Perfil, (perfil) => perfil.rol)
  perfiles: Perfil[];
}
