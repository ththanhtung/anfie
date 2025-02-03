import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlleyDto } from '../dto/create-alley.dto';
import { AlleyRepository } from '../repositories';
import { GroupService } from 'src/apis/group/services';
import { GetAlleysDto } from '../dto';
import { EGroupType } from 'src/common';

@Injectable()
export class AlleyService {
	constructor(
		private readonly alleyRepository: AlleyRepository,
		private readonly groupService: GroupService
	) {}
	async createAlley(user: TUserJwt, dto: CreateAlleyDto) {
		const { title, parentId } = dto;

		let rightValue = 0;
		if (parentId) {
			const parentAlley = await this.alleyRepository.findOneById(parentId);
			if (!parentAlley) throw new NotFoundException([{ message: 'parent alley not found' }]);
			rightValue = parentAlley.alleyRight;
			await this.alleyRepository.increaseAlleyRightBy2(rightValue);
			await this.alleyRepository.increaseAlleyLeftBy2(rightValue);
		} else {
			const maxRightValue = await this.alleyRepository.findMaxRightValue();
			if (maxRightValue) {
				rightValue = maxRightValue.alleyRight + 1;
			} else {
				rightValue = 1;
			}
		}

		const alley = await this.alleyRepository.createOne({
			parentId,
			left: rightValue,
			right: rightValue + 1,
			title
		});

		await this.groupService.create(user, { title, users: [], type: EGroupType.PUBLIC, alleyId: alley.id });

		return alley;
	}

	async getAlleyByParentId(parentId: string, query: GetAlleysDto) {
		return this.alleyRepository.findAlleysByParentId(parentId, query);
	}

	async deleteAlley(id: string) {
		const alley = await this.alleyRepository.findOneById(id);
		if (!alley) {
			throw new NotFoundException([
				{
					message: 'alley not found'
				}
			]);
		}

		const leftValue = alley.alleyLeft;
		const rightValue = alley.alleyRight;

		const width = rightValue - leftValue + 1;

		await this.alleyRepository.deleteBetween(leftValue, rightValue);

		await this.alleyRepository.decreaseAlleyLeft(leftValue, width);
		await this.alleyRepository.decreaseAlleyRight(rightValue, width);

		await this.alleyRepository.delete(id);

		return true;
	}

	async findOneById(id: string) {
		const alley = await this.alleyRepository.findOneById(id);
		return alley;
	}

	async getFirstAlley(user: TUserJwt) {
		const data = await this.alleyRepository.findFirstAlley();

		if (!data) {
			return await this.createAlley(user, {
				title: 'Anfie'
			});
		}

		return data;
	}

	async enableAlley(id: string) {
		const alley = await this.alleyRepository.findOneById(id);
		if (!alley) {
			throw new NotFoundException([
				{
					message: 'alley not found'
				}
			]);
		}
		await this.alleyRepository.updateAlleyStatusByID(id, false);
		return true;
	}

	async disableAlley(id: string) {
		const alley = await this.alleyRepository.findOneById(id);
		if (!alley) {
			throw new NotFoundException([
				{
					message: 'alley not found'
				}
			]);
		}
		await this.alleyRepository.updateAlleyStatusByID(id, true);
		return true;
	}
}
