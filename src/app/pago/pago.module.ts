import { Module } from '@nestjs/common';
import { PagoController } from './pago.controller';
import { PagoService } from './services/pago.service';

@Module({
  controllers: [PagoController],
  providers: [PagoService],
  exports: [PagoService],
})
export class PagoModule {}
