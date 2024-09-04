import { User } from 'src/auth/schemas/user.schema';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, Index, CreateDateColumn } from 'typeorm';

@Entity('accounts')
export class Accounts extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column('simple-array', { nullable: false })
  @Index()
  amounts: number[];

  @Column({ nullable: false, unique: true })
  @Index()
  paymentName: string;

  @Column({ nullable: false })
  @Index()
  slogan: string;

  @Column({ nullable: false })
  @Index()
  description: string;

  @Column({ nullable: false })
  @Index()
  message: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  
  @OneToOne(() => User)
  @Index()
  @JoinColumn()
  user: User;
}