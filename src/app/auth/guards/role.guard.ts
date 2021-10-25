import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RoleEnum } from '../../../data/enums/role.enum';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PerfilAuthPayload } from '../../perfil/models/dto/perfil.dto';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this._reflector.get<RoleEnum[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as PerfilAuthPayload;
    return roles.includes(user.rolId);
  }
}
