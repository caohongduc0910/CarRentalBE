import TimestampEntity from 'src/common/entities/base.entity';
import { Contract } from 'src/contracts/contract.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Collateral extends TimestampEntity {
  @Column()
  name: string;

  @Column()
  type: string;

  @OneToMany(() => Contract, (contract) => contract.collateral)
  contracts: Contract[];
}
