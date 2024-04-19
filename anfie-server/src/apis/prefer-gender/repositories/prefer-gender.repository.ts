import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PreferGender } from '../entities';
import { pagination } from 'src/common';
import { GetPreferencesDto } from 'src/apis/preferences/dto';

export class PreferGenderRepository extends Repository<PreferGender> {
	constructor(@InjectRepository(PreferGender) repository: Repository<PreferGender>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findByNames(names: string[]) {
		return this.find({
			where: { name: In(names) }
		});
	}

	async getPreferences(query: GetPreferencesDto) {
		return pagination(this, query);
	}

	async createOne(params: TPreferGenderParams) {
		return this.save(params);
	}

	async findOnebyName(name: string) {
		return this.findOne({
			where: { name }
		});
	}
}
