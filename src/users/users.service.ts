import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }
}
