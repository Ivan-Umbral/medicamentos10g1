import { Usuario } from '../../data/entities/usuario.entity';
import { PerfilAuthPayload } from '../../app/perfil/models/dto/perfil.dto';
import { Farmacia } from '../../data/entities/farmacia.entity';
import { Repartidor } from '../../data/entities/repartidor.entity';

export const createPerfilAuthPayload = (
  userDB: Usuario | Farmacia | Repartidor,
): PerfilAuthPayload => {
  const perfilPayload = new PerfilAuthPayload();
  perfilPayload.id = userDB.perfil.id;
  perfilPayload.ownerId = userDB.id;
  perfilPayload.rolId = userDB.perfil.rol.id;
  perfilPayload.correoElectronico = userDB.perfil.correoElectronico;
  perfilPayload.refreshToken = userDB.perfil.refreshToken;
  perfilPayload.username = userDB.perfil.username;
  return perfilPayload;
};
