import {
  Body,
  Controller,
  HttpException,
  Post,
  HttpStatus,
  Delete,
  Param,
  ParseIntPipe,
  Res,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FarmaciaService } from './services/farmacia.service';
import { FarmaciaCreateDTO } from './models/dto';
import { API_URL } from 'src/common/constants/routes.constants';
import { Response } from 'express';
import { Roles } from '../../common/decotators/role.decorator';
import { RoleEnum } from 'src/data/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller(`${API_URL}/farmacias`)
@ApiTags('Farmacias')
export class FarmaciaController {
  constructor(private _farmaciaService: FarmaciaService) {}

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACIA)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    const farmacia = await this._farmaciaService.getOne(id);
    if (farmacia) return farmacia;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Post('')
  public async createOne(@Body() farmaciaDTO: FarmaciaCreateDTO) {
    const response = await this._farmaciaService.createOne(farmaciaDTO);
    if (response) return response;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACIA)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  public async deleteOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const deleted = await this._farmaciaService.deleteOne(id);
    if (deleted) {
      return res.status(HttpStatus.OK).json({
        ok: true,
        message: 'Farmacia Deleted',
      });
    }
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
