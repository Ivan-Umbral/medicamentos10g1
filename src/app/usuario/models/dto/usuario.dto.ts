import { Exclude, Expose, Type } from 'class-transformer';
import { PerfilCreateDTO } from '../../../perfil/models/dto/perfil.dto';
import { DireccionCreateDTO } from '../../../direccion/models/dto/direccion.dto';
import {
  IsAlpha,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';

@Exclude()
export class UsuarioAuthReadDTO {
  @Expose()
  id: number;
}

export class UsuarioCreateDTO {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellidoPaterno: string;

  @IsOptional()
  @IsAlpha()
  apellidoMaterno?: string;

  @IsPhoneNumber('MX')
  telefono: string;

  @ValidateNested()
  @Type(() => DireccionCreateDTO)
  direccion: DireccionCreateDTO;

  @ValidateNested()
  @Type(() => PerfilCreateDTO)
  perfil: PerfilCreateDTO;
}
