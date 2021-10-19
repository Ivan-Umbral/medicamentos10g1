import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Carrito } from './carrito.entity';
import { DetalleOrden } from './detalle-orden.entity';

@Entity('medicamentos')
export class Medicamento {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  descripcion: string;

  @Column({
    type: 'float',
    nullable: false,
  })
  precio: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'float',
    nullable: false,
  })
  descuento: number;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  caducidad: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  imagen?: string;

  @OneToMany(() => Carrito, (carrito) => carrito.medicamento)
  productosCarrito: Carrito[];

  @OneToMany(() => DetalleOrden, (detalleOrden) => detalleOrden.medicamento)
  detallesOrdenes: DetalleOrden[];
}
