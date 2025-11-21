import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollateralDto } from './dto/create-collateral.dto';
import { UpdateCollateralDto } from './dto/update-collateral.dto';
import { Collateral } from './collateral.entity';

@Injectable()
export class CollateralService {
  constructor(
    @InjectRepository(Collateral)
    private repo: Repository<Collateral>,
  ) {}

  create(dto: CreateCollateralDto) {
    const collateral = this.repo.create(dto);
    return this.repo.save(collateral);
  }

  findAll() {
    // return this.repo.find({ relations: ['contracts'] });
    return this.repo.find();
  }

  async findOne(id: number) {
    const collateral = await this.repo.findOne({
      where: { id },
      relations: ['contracts'],
    });
    if (!collateral) throw new NotFoundException('Collateral not found');
    return collateral;
  }

  async update(id: number, dto: UpdateCollateralDto) {
    const collateral = await this.findOne(id);
    Object.assign(collateral, dto);
    return this.repo.save(collateral);
  }

  async remove(id: number) {
    const collateral = await this.findOne(id);
    return this.repo.remove(collateral);
  }
}
