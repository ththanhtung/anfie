import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export class BaseEntity<T> {
	constructor(entity: Partial<T>) {
		Object.assign(this, entity);
	}

	@PrimaryGeneratedColumn()
	id: string;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@DeleteDateColumn()
	@Exclude()
	deleted_at!: Date;
}
