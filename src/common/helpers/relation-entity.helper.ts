import { Estado } from '../../data/entities/estado.entity';
import { Municipio } from '../../data/entities/municipio.entity';
import { Colonia } from '../../data/entities/colonia.entity';

export const getEstadoRealtionIdObject = (id: number): Estado => {
  const estado = new Estado();
  estado.id = id;
  return estado;
};

export const getMunicipioRealtionIdObject = (id: number): Municipio => {
  const municipio = new Municipio();
  municipio.id = id;
  return municipio;
};

export const getColoniaRealtionIdObject = (id: number): Colonia => {
  const colonia = new Colonia();
  colonia.id = id;
  return colonia;
};
