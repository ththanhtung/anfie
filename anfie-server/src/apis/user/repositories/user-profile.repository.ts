import { In, Repository } from 'typeorm';
import { UserProfiles } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserProfilesDto } from '../dto';
import { pagination } from 'src/common';
import { TCreateUserProfileParams, TUpdateUserProfileParams } from 'src/common/@types/user-profile';

export class UserProfileRepository extends Repository<UserProfiles> {
	constructor(@InjectRepository(UserProfiles) repository: Repository<UserProfiles>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async createOne(profile: TCreateUserProfileParams) {
		return this.save(profile);
	}

	async updateOne(profile: TUpdateUserProfileParams) {
		return this.save(profile);
	}

	async findAll(query: GetUserProfilesDto) {
		return pagination(this, query);
	}

	async updateUserPreferences(profile: UserProfiles) {
		await this.save(profile);
		return this.findOne({
			where: {
				id: profile.id
			},
			relations: ['locations', 'preferences', 'preferGenders', 'user']
		});
	}

	async getProfileByUserId(id: string) {
		return this.findOne({
			where: {
				user: { id: id }
			},
			relations: ['locations', 'preferences', 'preferGenders', 'user']
		});
	}

	async getProfilesByUserIds(ids: string[]) {
		return this.find({ where: { user: { id: In(ids) } }, relations: ['locations', 'preferences', 'preferGenders', 'user'] });
	}

	async banUser(userId: string) {
		await this.update({ user: { id: userId } }, { isBanned: true, isActive: false });
	}

	async increaseReportedCountByOne(userId: string) {
		await this.update({ user: { id: userId } }, { reportedCount: () => 'user_reported_count + 1' });
		const profile = await this.findOne({
			where: {
				user: { id: userId }
			}
		});

		if (profile.reportedCount % 3 === 0) {
			await this.reduceStrangerConversationSlotByOne(userId);
		}
	}

	async reduceStrangerConversationSlotByOne(userId: string) {
		await this.update({ user: { id: userId } }, { strangerConversationSlots: () => 'user_stranger_conversation_slots - 1' });
		const profile = await this.findOne({
			where: {
				user: { id: userId }
			}
		});

		if (profile.reportedCount > 9) {
			await this.banUser(userId);
		}
	}
}
