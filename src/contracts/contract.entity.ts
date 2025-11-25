import { Car } from 'src/cars/car.entity';
import { Collateral } from 'src/collaterals/collateral.entity';
import TimestampEntity from 'src/common/entities/base.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ContractCar } from './contract-car.entity';
import { ContractCollateral } from './contract-collateral.entity';

@Entity()
export class Contract extends TimestampEntity {
  @Column()
  userId: string;

  @Column()
  carId: string;

  @Column()
  collateralId: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  estimatedPrice: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Car)
  car: Car;

  @ManyToOne(() => Collateral)
  collateral: Collateral;

  @OneToMany(() => ContractCar, (cc) => cc.contract)
  contractCars: ContractCar[];

  @OneToMany(() => ContractCollateral, (cc) => cc.contract)
  contractCollaterals: ContractCollateral[];
}
