import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CarService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() dto: CreateCarDto) {
    return this.carService.create(dto);
  }

  @Get()
  findAll(@Query('start') start?: string, @Query('end') end?: string) {
    if (start && end) {
      return this.carService.findAvailable(start, end);
    }

    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCarDto) {
    return this.carService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
