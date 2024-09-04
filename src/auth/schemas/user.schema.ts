import { Accounts } from 'src/components/accounts/accounts/accounts.schema';
import { Payments } from 'src/components/payments/payments/payments.schema';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, Index, OneToMany, CreateDateColumn } from 'typeorm';


export enum userRoles {
  User = 'user',
  Admin = 'admin',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @Index()
  first_name: string;

  @Column({ nullable: false })
  @Index()
  last_name: string;

  @Column({ unique: true, nullable: false })
  @Index()
  username: string;

  @Column({ unique: true, nullable: false })
  @Index()
  phone_number: number;

  @Column({ unique: true, nullable: false })
  @Index()
  email: string;

  @Column({ nullable: false })
  @Index()
  password: string

  @Column('boolean', { default: false, nullable: false })
  @Index()
  isActive: boolean;

  @Column('boolean', { default: false, nullable: false })
  @Index()
  isVerified: boolean;

  @Column({ nullable: false, default: userRoles.User })
  @Index()
  role: userRoles;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Accounts, account => account.user, { cascade: true })
  account: Accounts

  @OneToMany(() => Payments, payment => payment.user)
  payments: Payments[]
}