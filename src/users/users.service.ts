import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.repo.findAndCount({
      where: {
        role: 'user',
      },
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    const [existUserEmail, existUserPhone, existUserCCCD] = await Promise.all([
      this.repo.findOne({
        where: { email: dto.email, id: Not(id) },
      }),
      this.repo.findOne({
        where: { phone: dto.phone, id: Not(id) },
      }),
      this.repo.findOne({
        where: { cccd: dto.cccd, id: Not(id) },
      }),
    ]);

    if (existUserEmail) throw new NotFoundException('Email already exists');

    if (existUserPhone)
      throw new NotFoundException('Phone number already exists');

    if (existUserCCCD) throw new NotFoundException('CCCD already exists');
    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }
}
