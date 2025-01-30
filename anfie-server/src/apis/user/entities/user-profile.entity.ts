import { Location } from 'src/apis/locations/entities';
import { Preference } from 'src/apis/preferences/entities';
import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Users } from './user.entity';
import { ReportTicket } from 'src/apis/report-ticket/entities';
import { PreferGender } from 'src/apis/prefer-gender/entities';

@Entity()
export class UserProfiles extends BaseEntity<UserProfiles> {
	@Column({
		name: 'user_gender'
	})
	gender: string;

	@Column({
		name: 'user_phone_number',
		nullable: true
	})
	phone: string;

	@Column({
		name: 'user_max_age',
		nullable: true
	})
	maxAge: number;

	@Column({
		name: 'user_min_age',
		nullable: true
	})
	minAge: number;

	@Column({
		name: 'user_is_active',
		default: true
	})
	isActive: boolean;

	@Column({
		name: 'user_is_banned',
		default: false
	})
	isBanned: boolean;

	@Column({
		name: 'user_reported_count',
		default: 0
	})
	reportedCount: number;

	@Column({
		name: 'user_bio',
		nullable: true
	})
	bio: string;

	@Column({
		name: 'user_location',
		nullable: true
	})
	userLocation: string;

	@Column({
		name: 'user_stranger_conversation_slots',
		default: 3
	})
	strangerConversationSlots: number;

	@Column({
		name: 'user_id'
	})
	userId: string;

	@OneToOne(() => Users, { cascade: true, onDelete: 'CASCADE' })
	@JoinColumn({
		name: 'user_id'
	})
	user: Users;

	@OneToMany(() => ReportTicket, (reportTicket) => reportTicket.reporter, { nullable: true, cascade: true, onDelete: 'CASCADE' })
	submittedReportTickets: ReportTicket[];

	@OneToMany(() => ReportTicket, (reportTicket) => reportTicket.reportee, { nullable: true, cascade: true, onDelete: 'CASCADE' })
	receivedReportTickets: ReportTicket[];

	@ManyToMany(() => PreferGender, (preferGender) => preferGender.userProfiles)
	@JoinTable({
		name: 'user_prefer_genders',
		joinColumn: {
			name: 'user_profile_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'prefer_gender_id',
			referencedColumnName: 'id'
		}
	})
	preferGenders: PreferGender[];

	@ManyToMany(() => Preference, (preference) => preference.userProfiles)
	@JoinTable({
		name: 'user_preferences',
		joinColumn: {
			name: 'user_profile_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'preference_id',
			referencedColumnName: 'id'
		}
	})
	preferences: Preference[];

	@ManyToMany(() => Preference, (preference) => preference.userProfiles)
	@JoinTable({
		name: 'user_self_described',
		joinColumn: {
			name: 'user_profile_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'preference_id',
			referencedColumnName: 'id'
		}
	})
	selfDescribed: Preference[];

	@ManyToMany(() => Location, (location) => location.userProfiles)
	@JoinTable({
		name: 'user_locations',
		joinColumn: {
			name: 'user_profile_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'location_id',
			referencedColumnName: 'id'
		}
	})
	locations: Location[];
}
