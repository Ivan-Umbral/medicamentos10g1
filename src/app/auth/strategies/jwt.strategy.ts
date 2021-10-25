import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PerfilAuthPayload } from '../../perfil/models/dto/perfil.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _config.get<string>('jwt.secret'),
    });
  }

  async validate(payload: PerfilAuthPayload) {
    return payload;
  }
}
