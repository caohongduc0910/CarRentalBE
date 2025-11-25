import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { Contract } from './contract.entity';
import { User } from 'src/users/user.entity';
import { Car } from 'src/cars/car.entity';
import { Collateral } from 'src/collaterals/collateral.entity';
import { ContractCollateral } from './contract-collateral.entity';
import { ContractCar } from './contract-car.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contract,
      User,
      Car,
      Collateral,
      ContractCollateral,
      ContractCar,
    ]),
  ],
  controllers: [ContractsController],
  providers: [ContractService],
})
export class ContractModule {}
