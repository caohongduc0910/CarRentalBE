import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './contract.entity';
import { User } from 'src/users/user.entity';
import { Car } from 'src/cars/car.entity';
import { Collateral } from 'src/collaterals/collateral.entity';
import { ContractCollateral } from './contract-collateral.entity';
import { ContractCar } from './contract-car.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private repo: Repository<Contract>,
    @InjectRepository(ContractCollateral)
    private contractCollateralRepo: Repository<ContractCollateral>,
    @InjectRepository(ContractCar)
    private contractCarRepo: Repository<ContractCar>,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(Car)
    private carsRepo: Repository<Car>,
    @InjectRepository(Collateral)
    private collRepo: Repository<Collateral>,
  ) {}

  async create(dto: CreateContractDto) {
    const user = await this.usersRepo.findOne({ where: { id: dto.userId } });
    const car = await this.carsRepo.findOne({ where: { id: dto.carId } });
    const collateral = await this.collRepo.findOne({
      where: { id: dto.collateralId },
    });

    if (!user || !car || !collateral)
      throw new NotFoundException('User/Car/Collateral not found');

    const entity = this.repo.create({
      user,
      car,
      collateral,
      startDate: dto.startDate,
      endDate: dto.endDate,
      estimatedPrice: dto.estimatedPrice,
    });

    await entity.save();

    await Promise.all([
      this.contractCarRepo.save(
        this.contractCarRepo.create({
          contract: entity,
          car,
          quantity: 1,
        }),
      ),
      this.contractCollateralRepo.save(
        this.contractCollateralRepo.create({
          contract: entity,
          collateral,
          quantity: 1,
        }),
      ),
    ]);

    return entity;
  }

  async findAll(userId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const where = userId ? { user: { id: userId } } : {};

    const [data, total] = await this.repo.findAndCount({
      where,
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
      relations: ['user', 'car', 'collateral'],
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const contract = await this.repo.findOne({
      where: { id },
      relations: ['user', 'car', 'collateral'],
    });
    if (!contract) throw new NotFoundException('Contract not found');
    return contract;
  }

  async update(id: number, dto: UpdateContractDto) {
    const contract = await this.findOne(id);

    if (dto.userId) {
      const user = await this.usersRepo.findOne({ where: { id: dto.userId } });
      if (!user) throw new NotFoundException('User not found');
      contract.user = user;
    }

    if (dto.carId) {
      const car = await this.carsRepo.findOne({ where: { id: dto.carId } });
      if (!car) throw new NotFoundException('Car not found');
      contract.car = car;
    }

    if (dto.collateralId) {
      const collateral = await this.collRepo.findOne({
        where: { id: dto.collateralId },
      });
      if (!collateral) throw new NotFoundException('Collateral not found');
      contract.collateral = collateral;
    }

    if (dto.startDate) contract.startDate = dto.startDate;
    if (dto.endDate) contract.endDate = dto.endDate;
    if (dto.estimatedPrice) contract.estimatedPrice = dto.estimatedPrice;

    return this.repo.save(contract);
  }

  async remove(id: number) {
    const contract = await this.findOne(id);
    return this.repo.remove(contract);
  }
}
