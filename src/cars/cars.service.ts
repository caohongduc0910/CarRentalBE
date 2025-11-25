import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private repo: Repository<Car>,
  ) {}

  create(dto: CreateCarDto) {
    const car = this.repo.create(dto);
    return this.repo.save(car);
  }

  findAll() {
    // return this.repo.find({ relations: ['contracts'] });
    return this.repo.find();
  }

  async findAvailable(start: string, end: string) {
    return this.repo
      .createQueryBuilder('car')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from('contract', 'contract')
          .where('contract.carId = car.id')
          .andWhere('contract.startDate < :end')
          .andWhere('contract.endDate > :start')
          .getQuery();

        return `NOT EXISTS (${subQuery})`;
      })
      .setParameters({ start, end })
      .getMany();
  }

  async findOne(id: number) {
    const car = await this.repo.findOne({
      where: { id },
      relations: ['contracts'],
    });
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }

  async update(id: number, dto: UpdateCarDto) {
    const car = await this.findOne(id);
    Object.assign(car, dto);
    return this.repo.save(car);
  }

  async remove(id: number) {
    const car = await this.findOne(id);
    return this.repo.remove(car);
  }
}
