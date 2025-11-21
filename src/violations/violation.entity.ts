import TimestampEntity from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Violation extends TimestampEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;
}
