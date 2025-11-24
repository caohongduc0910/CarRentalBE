import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateViolationDto } from './dto/create-violation.dto';
import { UpdateViolationDto } from './dto/update-violation.dto';
import { Violation } from './violation.entity';

@Injectable()
export class ViolationService {
  constructor(
    @InjectRepository(Violation)
    private repo: Repository<Violation>,
  ) {}

  create(dto: CreateViolationDto) {
    const violation = this.repo.create(dto);
    return this.repo.save(violation);
  }

  findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.repo
      .findAndCount({
        skip,
        take: limit,
        order: {
          createdAt: 'DESC',
        },
      })
      .then(([data, total]) => ({
        data,
        total,
        page,
        limit,
      }));
  }

  async findOne(id: number) {
    const violation = await this.repo.findOne({ where: { id } });
    if (!violation) throw new NotFoundException('Violation not found');
    return violation;
  }

  async update(id: number, dto: UpdateViolationDto) {
    const violation = await this.findOne(id);
    Object.assign(violation, dto);
    return this.repo.save(violation);
  }

  async remove(id: number) {
    const violation = await this.findOne(id);
    return this.repo.remove(violation);
  }
}
