import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { API_URL } from 'src/common/constants/routes.constants';
import { MedicamentoService } from './services/medicamento.service';
import { RoleEnum } from '../../data/enums/role.enum';
import { Roles } from '../../common/decotators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { MedicamentoCreateDTO } from './models/dto/medicamento-create.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @Get('farmacia/:farmaciaId')
  public async getMedicamentosByFarmaciaId(
    @Param('farmaciaId', ParseIntPipe) farmaciaId: number,
  ) {
    const medicamentos = await this._medService.getMedicamentosByFarmaciaId(
      farmaciaId,
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

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACIA)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('')
  public async createOne(@Body() medicamento: MedicamentoCreateDTO) {
    const med = await this._medService.createOne(medicamento);
    if (med) return med;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @ApiBearerAuth()
  // @ApiBody({ schema: { type: 'file', format: 'binary'} })
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACIA)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('medicamentoPhoto'))
  @Post('medicamento/photo/:medicamentoId')
  public async uploadMedPhoto(
    @Param('medicamentoId', ParseIntPipe) medicamentoId: number,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    try {
      const uploaded = await this._medService.uploadMedPhoto(photo);
      if (uploaded) {
        await this._medService.updateImage(medicamentoId, uploaded.secure_url);
        return { url: uploaded.secure_url };
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (e) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
