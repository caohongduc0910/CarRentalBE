import { Car } from 'src/cars/car.entity';
import TimestampEntity from 'src/common/entities/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Contract } from './contract.entity';

@Entity()
export class ContractCar extends TimestampEntity {
  @Column()
  contractId: string;

  @Column()
  carId: string;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Contract, (contract) => contract.contractCars, {
    onDelete: 'CASCADE',
  })
  contract: Contract;

  @ManyToOne(() => Car, (car) => car.contractCars, {
    onDelete: 'CASCADE',
  })
  car: Car;
}
