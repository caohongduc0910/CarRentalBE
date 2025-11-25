import TimestampEntity from 'src/common/entities/base.entity';
import { ContractCollateral } from 'src/contracts/contract-collateral.entity';
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

  @OneToMany(() => ContractCollateral, (cc) => cc.collateral)
  contractCollaterals: ContractCollateral[];
}
