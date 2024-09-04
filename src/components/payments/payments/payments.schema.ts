import { User } from 'src/auth/schemas/user.schema';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, Index, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity('payments')
export class Payments extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column({ type: 'float', nullable: false })
  @Index()
  fan_phone_number: number;

  @Column({ nullable: true })
  @Index()
  fan_message: string;

  @Column({ nullable: true })
  @Index()
  fan_name: string;

  @Column({ nullable: false })
  @Index()
  fan_amount: number;

  @Column({ nullable: true })
  owner_slug: string;

  @Column({ default: 3 })
  baseRate: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  
  @ManyToOne(() => User, user => user.payments)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
