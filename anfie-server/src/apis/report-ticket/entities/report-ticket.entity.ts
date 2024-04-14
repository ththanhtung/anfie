import { Admin } from 'src/apis/admin/entities';
import { UserProfiles } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class ReportTicket extends BaseEntity<ReportTicket> {
	@Column({
		name: 'mod_id',
		nullable: true
	})
	modId: number;

	@Column({
		name: 'reporter_id'
	})
	reporterId: number;

	@Column({
		name: 'reportee_id'
	})
	reporteeId: number;

	@Column({
		name: 'report_content'
	})
	content: string;

	@Column({
		name: 'report_type'
	})
	type: TReportTicketType;

	@Column({
		name: 'report_status',
		default: 'pending'
	})
	status: TReportTicketStatus;

	@ManyToOne(() => Admin, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'mod_id'
	})
	mod: Admin;

	@ManyToOne(() => UserProfiles, (user) => user.receivedReportTickets, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'reporter_id'
	})
	reporter: UserProfiles;

	@ManyToOne(() => UserProfiles, (user) => user.submittedReportTickets, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'reportee_id'
	})
	reportee: UserProfiles;
}
