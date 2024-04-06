import { Users } from 'src/apis/user/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn } from 'typeorm';

@Entity()
export class ReportTicket extends BaseEntity<ReportTicket> {
	@Column({
		name: 'mod_id'
	})
	modId: string;

	@Column({
		name: 'reporter_id'
	})
	reporterId: string;

	@Column({
		name: 'reported_id'
	})
	reportedId: string;

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

	@JoinColumn({
		name: 'mod_id'
	})
	mod: Users;

	@JoinColumn({
		name: 'reporter_id'
	})
	reporter: Users;

	@JoinColumn({
		name: 'reported_id'
	})
	reported: Users;
}
