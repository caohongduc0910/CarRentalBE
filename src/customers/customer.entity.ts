import TimestampEntity from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Customer extends TimestampEntity {
  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  cccd: string;

  @Column()
  address: string;
}
