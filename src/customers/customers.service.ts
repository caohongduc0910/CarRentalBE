import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private repo: Repository<Customer>,
  ) {}

  create(dto: CreateCustomerDto) {
    const customer = this.repo.create(dto);
    return this.repo.save(customer);
  }

  findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.repo
      .findAndCount({
        skip,
        take: limit,
      })
      .then(([data, total]) => ({
        data,
        total,
        page,
        limit,
      }));
  }

  async findOne(id: number) {
    const customer = await this.repo.findOne({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    Object.assign(customer, dto);
    return this.repo.save(customer);
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    return this.repo.remove(customer);
  }
}
