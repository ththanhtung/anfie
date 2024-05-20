import { Exclude } from 'class-transformer';
import { Role } from 'src/apis/role/entities';
import { AdminUserType } from 'src/common';
import { BaseEntity } from 'src/database';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import * as argon from 'argon2';
import { ReportTicket } from 'src/apis/report-ticket/entities';

@Entity()
export class Admin extends BaseEntity<Admin> {
	@Column({
		name: 'admin_name'
	})
	name: string;

	@Column({
		name: 'admin_username'
	})
	username: string;

	@Column({ default: AdminUserType.ADMIN })
	type!: AdminUserType;

	@Exclude()
	@Column({
		name: 'admin_password'
	})
	hash: string;

	@Column({
		name: 'access_token',
		nullable: true
	})
	accessToken: string;

	@OneToMany(() => ReportTicket, (reportTicket) => reportTicket.mod)
	processedReportedTickets: ReportTicket[];

	@ManyToMany(() => Role)
	@JoinTable({
		name: 'admin_role',
		joinColumn: {
			name: 'admin_id'
		},
		inverseJoinColumn: {
			name: 'role_id'
		}
	})
	roles: Role[];

	@BeforeInsert()
	@Exclude()
	async hashedPassword() {
		this.hash = await argon.hash(this.hash);
	}
}
