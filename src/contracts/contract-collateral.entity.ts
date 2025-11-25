import { Collateral } from 'src/collaterals/collateral.entity';
import TimestampEntity from 'src/common/entities/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Contract } from './contract.entity';

@Entity()
export class ContractCollateral extends TimestampEntity {
  @Column()
  contractId: string;

  @Column()
  collateralId: string;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Contract, (contract) => contract.contractCollaterals, {
    onDelete: 'CASCADE',
  })
  contract: Contract;

  @ManyToOne(() => Collateral, (collateral) => collateral.contractCollaterals, {
    onDelete: 'CASCADE',
  })
  collateral: Collateral;
}
