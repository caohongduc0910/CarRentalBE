import TimestampEntity from 'src/common/entities/base.entity';
import { Contract } from 'src/contracts/contract.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Car extends TimestampEntity {
  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  pricePerDay: number;

  @Column()
  licensePlate: string;

  @OneToMany(() => Contract, (contract) => contract.car)
  contracts: Contract[];
}
