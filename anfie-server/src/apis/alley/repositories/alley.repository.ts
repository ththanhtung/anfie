import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Alley } from '../entities';
import { GetAlleysDto } from '../dto';
import { pagination } from 'src/common';

@Injectable()
export class AlleyRepository extends Repository<Alley> {
	constructor(@InjectRepository(Alley) repository: Repository<Alley>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findOneById(id: string) {
		return this.findOne({
			where: {
				id: id
			}
		});
	}

	async increaseAlleyRightBy2(rightValue: number) {
		return this.update(
			{
				alleyRight: MoreThanOrEqual(rightValue)
			},
			{
				alleyRight: () => 'alley_right + 2'
			}
		);
	}
	async increaseAlleyLeftBy2(rightValue: number) {
		return this.update(
			{
				alleyLeft: MoreThan(rightValue)
			},
			{
				alleyLeft: () => 'alley_left + 2'
			}
		);
	}

	async findMaxRightValue() {
		const maxAlleys = await this.find({
			select: ['alleyRight'],
			order: {
				alleyRight: 'DESC'
			}
		});

		return maxAlleys[0];
	}

	async updateAlleyLeftRight(id: number, alleyLeft: number, alleyRight: number) {
		return this.update(id, {
			alleyLeft,
			alleyRight
		});
	}

	async createOne({ parentId, left, right, groupId, title }: TCreateAlleyParams) {
		console.log({ parentId, left, right, groupId });
		return this.save({
			parentId: parentId ? parentId : null,
			alleyLeft: left,
			alleyRight: right,
			groupId,
			title
		});
	}

	async findAlleysByParentId(parentId: string, query: GetAlleysDto) {
		if (parentId) {
			const parent = await this.findOneById(parentId);
			if (!parent) throw new NotFoundException([{ message: 'parent alley not found' }]);
			return pagination(this, query, {
				where: {
					alleyLeft: MoreThan(parent.alleyLeft),
					alleyRight: LessThanOrEqual(parent.alleyRight),
					parentId
				},
				order: {
					alleyLeft: 'ASC'
				}
			});
		}
		return pagination(this, query, {
			order: {
				alleyLeft: 'ASC'
			}
		});
	}

	async findOneAndDelete(id: string) {
		return this.delete(id);
	}

	async deleteBetween(leftValue: number, rightValue: number) {
		return this.delete({
			alleyLeft: Between(leftValue, rightValue)
		});
	}

	async decreaseAlleyLeft(leftValue: number, amount: number) {
		return this.update(
			{
				alleyLeft: MoreThanOrEqual(leftValue)
			},
			{
				alleyLeft: () => `alley_left - ${amount}`
			}
		);
	}

	async decreaseAlleyRight(rightValue: number, amount: number) {
		return this.update(
			{
				alleyRight: MoreThanOrEqual(rightValue)
			},
			{
				alleyRight: () => `alley_right - ${amount}`
			}
		);
	}

	async findFirstAlley() {
		return this.findOne({
			where: {
				alleyLeft: 1
			}
		});
	}

	async findGroupsByAlleyId(alleyId: string) {
		const alley = await this.findOne({
			where: {
				id: alleyId
			},
			relations: ['group']
		});

		return alley.group;
	}
}
