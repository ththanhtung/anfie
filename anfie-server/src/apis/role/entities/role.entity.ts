import { Permission } from 'src/common';
import { BaseEntity } from 'src/database';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends BaseEntity<Role> {
	@Column({
		name: 'role_name'
	})
	name: string;

	@Column({
		name: 'role_description'
	})
	description?: string;

	@Column({
		name: 'role_permissions'
	})
	@Column('simple-array')
	permissions: Permission[];
}
