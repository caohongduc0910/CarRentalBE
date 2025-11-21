import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateCollateralDto } from './dto/create-collateral.dto';
import { UpdateCollateralDto } from './dto/update-collateral.dto';
import { CollateralService } from './collaterals.service';

@Controller('collaterals')
export class CollateralController {
  constructor(private readonly collateralService: CollateralService) {}

  @Post()
  create(@Body() dto: CreateCollateralDto) {
    return this.collateralService.create(dto);
  }

  @Get()
  findAll() {
    return this.collateralService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collateralService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCollateralDto) {
    return this.collateralService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collateralService.remove(+id);
  }
}
