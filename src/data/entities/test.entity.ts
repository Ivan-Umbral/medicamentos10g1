import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test')
export class Test {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  descripcion?: string;
}
