import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export class BaseEntity<T> {
	constructor(entity: Partial<T>) {
		Object.assign(this, entity);
	}

	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@CreateDateColumn({
		type: 'timestamp with time zone'
	})
	created_at!: Date;

	@UpdateDateColumn({
		type: 'timestamp with time zone'
	})
	updated_at!: Date;

	@DeleteDateColumn({
		type: 'timestamp with time zone'
	})
	@Exclude()
	deleted_at!: Date;
}
