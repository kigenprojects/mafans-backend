import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

@Entity('Errors')
export class ErrorsEntity extends BaseEntity {
@PrimaryGeneratedColumn()
id: number;

@Column()
message: string;

@Column()
statusCode: number;

@Column()
path: string;
}