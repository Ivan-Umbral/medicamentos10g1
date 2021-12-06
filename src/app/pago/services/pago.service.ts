import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';
import { STRIPE_API_SECRET } from '../../../config/constants.config';
import { PaymentCreateDTO } from '../models/dto/payment-create.dto';

@Injectable()
export class PagoService {
  private stripe: Stripe;

  constructor(private _config: ConfigService) {
    this.stripe = new Stripe(this._config.get<string>(STRIPE_API_SECRET), {
      apiVersion: '2020-08-27',
    });
  }

  public async createCharge(payment: PaymentCreateDTO): Promise<Stripe.Charge> {
    try {
      const charge = await this.stripe.charges.create({
        amount: payment.amount * 100,
        currency: 'MXN',
        source: payment.token,
        description: payment.description,
      });
      if (charge) return charge;
      return null;
    } catch (error) {
      return null;
    }
  }
}
