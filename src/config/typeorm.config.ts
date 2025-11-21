import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Car } from '../cars/car.entity';
import { Collateral } from 'src/collaterals/collateral.entity';
import { Violation } from 'src/violations/violation.entity';
import { Customer } from 'src/customers/customer.entity';
import { Contract } from 'src/contracts/contract.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql', // mysql cũng được
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'yourpassword',
  database: 'rental',
  entities: [User, Car, Collateral, Violation, Customer, Contract],
  synchronize: true,
};
