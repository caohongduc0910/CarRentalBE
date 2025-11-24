import TimestampEntity from 'src/common/entities/base.entity';
import { Contract } from 'src/contracts/contract.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class User extends TimestampEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  cccd: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: 'user' })
  role: 'admin' | 'user';

  @OneToMany(() => Contract, (contract) => contract.user)
  contracts: Contract[];
}
