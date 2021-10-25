import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../../data/enums/role.enum';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
