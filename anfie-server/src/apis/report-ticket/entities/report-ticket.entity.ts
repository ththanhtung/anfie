import { Admin } from 'src/apis/admin/entities';
import { Comment } from 'src/apis/comment/entities';
import { Confession } from 'src/apis/confessions/entities';
import { Conversation } from 'src/apis/conversation/entities';
import { Message } from 'src/apis/message/entities';
import { Post } from 'src/apis/post/entities';
import { UserProfiles } from 'src/apis/user/entities';
import { TReportTicketStatus } from 'src/common/@types/report-ticket';
import { EReportTicketType } from 'src/common/enums/reportTicket';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class ReportTicket extends BaseEntity<ReportTicket> {
	@Column({
		name: 'post_id',
		nullable: true
	})
	postId: string;

	@Column({
		name: 'conversation_id',
		nullable: true
	})
	conversationId: string;

	@Column({
		name: 'confession_id',
		nullable: true
	})
	confessionId: string;

	@Column({
		name: 'comment_id',
		nullable: true
	})
	commentId: string;

	@Column({
		name: 'mod_id',
		nullable: true
	})
	modId: string;

	@Column({
		name: 'reporter_id'
	})
	reporterId: string;

	@Column({
		name: 'reportee_id'
	})
	reporteeId: string;

	@Column({
		name: 'report_content'
	})
	content: string;

	@Column({
		name: 'report_type'
	})
	type: EReportTicketType;

	@Column({
		name: 'report_status',
		default: 'pending'
	})
	status: TReportTicketStatus;

	@ManyToOne(() => Post, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'post_id'
	})
	post: Post;

	@OneToOne(() => Conversation, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'conversation_id'
	})
	conversation: Conversation;

	@ManyToOne(() => Confession, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'confession_id'
	})
	confession: Confession;

	@ManyToOne(() => Comment, { createForeignKeyConstraints: false })
	@JoinColumn({
		name: 'comment_id'
	})
	comment: Comment;

	@ManyToMany(() => Message)
	@JoinTable({
		name: 'message_report_ticket',
		joinColumn: {
			name: 'message_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'report_ticket_id',
			referencedColumnName: 'id'
		}
	})
	messages: Message[];

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
