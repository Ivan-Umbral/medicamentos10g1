import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { API_URL } from 'src/common/constants/routes.constants';
import { MedicamentoService } from './services/medicamento.service';
import { RoleEnum } from '../../data/enums/role.enum';
import { Roles } from '../../common/decotators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller(`${API_URL}/medicamentos`)
@ApiTags('Medicamentos')
export class MedicamentoController {
  constructor(private _medService: MedicamentoService) {}

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACIA, RoleEnum.USUARIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('')
  public async getMedicamentos() {
    const medicamentos = await this._medService.getMedicamentos();
    if (medicamentos) return medicamentos;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACIA, RoleEnum.USUARIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/paginate')
  public async getPaginatedMedicamentos(
    @Query('take', ParseIntPipe) take: number,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    const medicamentos = await this._medService.getPaginatedMedicamentos(
      take,
      skip,
    );
    if (medicamentos) return medicamentos;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACIA, RoleEnum.USUARIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    const medicamento = await this._medService.getOne(id);
    if (medicamento) return medicamento;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
