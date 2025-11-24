import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './cars/cars.module';
import { CollateralModule } from './collaterals/collaterals.module';
import { ViolationModule } from './violations/violations.module';
import { CustomerModule } from './customers/customers.module';
import { ContractModule } from './contracts/contracts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Car } from './cars/car.entity';
import { Collateral } from './collaterals/collateral.entity';
import { Violation } from './violations/violation.entity';
import { Customer } from './customers/customer.entity';
import { Contract } from './contracts/contract.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'rental',
      entities: [User, Car, Collateral, Violation, Customer, Contract],
      synchronize: true,
      logging: true,
    }),
    CarModule,
    CollateralModule,
    ViolationModule,
    CustomerModule,
    ContractModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
