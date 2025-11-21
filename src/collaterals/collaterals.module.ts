import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collateral } from './collateral.entity';
import { CollateralController } from './collaterals.controller';
import { CollateralService } from './collaterals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Collateral])],
  controllers: [CollateralController],
  providers: [CollateralService],
})
export class CollateralModule {}
