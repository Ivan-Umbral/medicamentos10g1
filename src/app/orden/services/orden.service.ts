import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orden } from '../../../data/entities/orden.entity';
import { Repository } from 'typeorm';
import { MapperService } from '../../../common/mapper/services/mapper.service';
import { PagoService } from '../../pago/services/pago.service';
import { FullOrdenReadDTO, OrdenWDetalleCreateDTO } from '../models/dto';
import { Stripe } from 'stripe';
import { format } from 'date-fns';
import { Usuario } from '../../../data/entities/usuario.entity';
import { DetalleOrden } from '../../../data/entities/detalle-orden.entity';
import { Medicamento } from '../../../data/entities/medicamento.entity';

@Injectable()
export class OrdenService {
  constructor(
    @InjectRepository(Orden) private _ordenRepository: Repository<Orden>,
    private _mapper: MapperService,
    private _pagoService: PagoService,
  ) {}

  public async createOrderWithDetail(
    body: OrdenWDetalleCreateDTO,
  ): Promise<FullOrdenReadDTO> {
    try {
      const pagado = await this._pagoService.createCharge(body.payment);
      if (pagado) {
        const ordenEntity = this.getOrderNestedObject(body, pagado);
        const orden = await this._ordenRepository.save(ordenEntity);
        if (orden) {
          const ordenDTO = this._mapper.toDTO<FullOrdenReadDTO>(
            orden,
            FullOrdenReadDTO,
          );
          return ordenDTO;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  private getOrderNestedObject(
    body: OrdenWDetalleCreateDTO,
    charge: Stripe.Charge,
  ): Orden {
    const orden = new Orden();
    const usuario = new Usuario();
    const detalleOrden = new DetalleOrden();
    const medicamento = new Medicamento();
    const today = new Date();
    usuario.id = body.usuarioId;
    medicamento.id = body.medicamentoId;
    detalleOrden.cantidad = body.cantidad;
    detalleOrden.medicamento = medicamento;
    orden.fecha = format(today, 'yyyy-MM-dd');
    orden.hora = format(today, 'HH:mm:ss');
    orden.total = body.total;
    orden.tipoPago = body.tipoPago;
    orden.usuario = usuario;
    orden.stripeChargeId = charge.id;
    orden.detallesOrdenes = [detalleOrden];
    return orden;
  }
}
