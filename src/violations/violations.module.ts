import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Violation } from './violation.entity';
import { ViolationController } from './violations.controller';
import { ViolationService } from './violations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Violation])],
  controllers: [ViolationController],
  providers: [ViolationService],
})
export class ViolationModule {}
